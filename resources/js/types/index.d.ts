export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Trip {
    id: number;
    name: string;
    slug: string;
    userId: string;
    memberCount: number;
    totalExpenses: {
        amount: string,
        currency: string,
        formatted: string,
    };
    description: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
