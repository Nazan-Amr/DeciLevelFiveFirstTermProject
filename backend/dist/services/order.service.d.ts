import { OrderStatus } from '@prisma/client';
export declare const createOrder: (userId: string) => Promise<{
    user: {
        id: string;
        email: string;
        googleId: string | null;
        name: string;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    orderItems: ({
        product: {
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
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        quantity: number;
        orderId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    total: import("@prisma/client/runtime/library").Decimal;
    userId: string;
    status: import(".prisma/client").$Enums.OrderStatus;
}>;
export declare const getOrders: (userId?: string) => Promise<any[]>;
export declare const getOrderById: (id: string) => Promise<{
    total: number;
    orderItems: any[];
    user: {
        id: string;
        email: string;
        googleId: string | null;
        name: string;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: import(".prisma/client").$Enums.OrderStatus;
} | null>;
export declare const updateOrderStatus: (id: string, status: OrderStatus) => Promise<{
    total: number;
    orderItems: any[];
    user: {
        id: string;
        email: string;
        googleId: string | null;
        name: string;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: import(".prisma/client").$Enums.OrderStatus;
}>;
//# sourceMappingURL=order.service.d.ts.map