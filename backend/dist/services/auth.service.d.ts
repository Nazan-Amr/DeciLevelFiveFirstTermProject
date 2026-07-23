export declare const register: (email: string, password: string, name: string) => Promise<{
    user: {
        id: any;
        email: any;
        name: any;
        role: any;
    };
    token: string;
}>;
export declare const login: (email: string, password: string) => Promise<{
    user: {
        id: any;
        email: any;
        name: any;
        role: any;
    };
    token: string;
}>;
export declare const getCurrentUser: (userId: string) => Promise<any>;
//# sourceMappingURL=auth.service.d.ts.map