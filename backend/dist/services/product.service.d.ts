export declare const getProducts: (filters: any) => Promise<{
    products: any[];
    pagination: {
        page: number;
        totalPages: number;
        total: number;
    };
}>;
export declare const getProductById: (id: string) => Promise<any>;
export declare const createProduct: (data: any, imageUrl?: string) => Promise<any>;
export declare const updateProduct: (id: string, data: any, imageUrl?: string) => Promise<any>;
export declare const deleteProduct: (id: string) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    price: import("@prisma/client/runtime/library").Decimal;
    description: string;
    stock: number;
    imageUrl: string | null;
    categoryId: string;
}>;
//# sourceMappingURL=product.service.d.ts.map