// Inertia.js types for authentication
export interface IAuthUser {
    id: string;
    name: string;
    email: string;
    roles: string[];
    role_names: string[];
    [key: string]: any;
}

export interface IAuthProps {
    user: IAuthUser | null;
}

// // Extend the global Page props interface for Inertia
// declare module '@inertiajs/core' {
//     interface PageProps {
//         auth: AuthProps;
//     }
// }
