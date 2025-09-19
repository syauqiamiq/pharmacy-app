import { usePage } from '@inertiajs/react';
import { IAuthUser } from '../interfaces/auth.interface';
import { IPageProps } from '../interfaces/page.interface';

/**
 * Hook to get current authenticated user data
 */
export const useAuthUser = (): IAuthUser | null => {
    const { props } = usePage<IPageProps>();
    return props.auth?.user || null;
};
