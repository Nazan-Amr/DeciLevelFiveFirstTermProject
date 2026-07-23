interface ProductFilters {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
export declare const getProducts: (filters: ProductFilters) => Promise<{
    products: any;
    pagination: {
        page: number;
        limit: number;
        total: any;
    };
}>;
export {};
//# sourceMappingURL=product.service.d.ts.map