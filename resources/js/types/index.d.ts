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
    user_id: string;
    members_count: number;
    description: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
