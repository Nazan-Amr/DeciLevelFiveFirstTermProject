export declare const getCart: (userId: string) => Promise<{
    items: any[];
    total: number;
}>;
export declare const addToCart: (userId: string, productId: string, quantity: number) => Promise<{
    product: {
        category: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
    quantity: number;
}>;
export declare const updateCartItem: (itemId: string, quantity: number) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
    quantity: number;
}>;
export declare const removeFromCart: (itemId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
    quantity: number;
}>;
export declare const clearCart: (userId: string) => Promise<import(".prisma/client").Prisma.BatchPayload>;
//# sourceMappingURL=cart.service.d.ts.map