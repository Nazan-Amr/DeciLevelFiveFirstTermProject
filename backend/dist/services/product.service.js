"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const database_1 = __importDefault(require("../config/database"));
const normalizePrice = (value) => {
    if (value === null || value === undefined || value === '')
        return value;
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : value;
};
const normalizeProduct = (product) => {
    if (!product || !('price' in product))
        return product;
    return { ...product, price: normalizePrice(product.price) };
};
const getProducts = async (filters) => {
    const { search, category, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 12 } = filters;
    const pageNumber = Number(page) || 1;
    const takeNumber = Number(limit) || 12;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }
    if (category) {
        where.category = { slug: category };
    }
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice)
            where.price.gte = parseFloat(minPrice);
        if (maxPrice)
            where.price.lte = parseFloat(maxPrice);
    }
    const skip = (pageNumber - 1) * takeNumber;
    const [products, total] = await Promise.all([
        database_1.default.product.findMany({
            where,
            include: { category: true },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: takeNumber
        }),
        database_1.default.product.count({ where })
    ]);
    // Convert Decimal price fields to numbers for JSON responses
    const productsNormalized = products.map((p) => normalizeProduct(p));
    return {
        products: productsNormalized,
        pagination: {
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            total
        }
    };
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    const product = await database_1.default.product.findUnique({
        where: { id },
        include: { category: true }
    });
    if (!product)
        return null;
    return normalizeProduct(product);
};
exports.getProductById = getProductById;
const createProduct = async (data, imageUrl) => {
    const product = await database_1.default.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            stock: parseInt(data.stock),
            categoryId: data.categoryId,
            imageUrl: imageUrl || null
        },
        include: { category: true }
    });
    return normalizeProduct(product);
};
exports.createProduct = createProduct;
const updateProduct = async (id, data, imageUrl) => {
    const updateData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        categoryId: data.categoryId
    };
    if (imageUrl !== undefined) {
        updateData.imageUrl = imageUrl;
    }
    const product = await database_1.default.product.update({
        where: { id },
        data: updateData,
        include: { category: true }
    });
    return normalizeProduct(product);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return database_1.default.product.delete({
        where: { id }
    });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.service.js.map