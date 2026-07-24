export declare const register: (email: string, password: string, name: string) => Promise<{
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    };
    token: string;
}>;
export declare const login: (email: string, password: string) => Promise<{
    user: {
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    };
    token: string;
}>;
export declare const getCurrentUser: (userId: string) => Promise<{
    id: string;
    email: string;
    name: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
}>;
//# sourceMappingURL=auth.service.d.ts.map