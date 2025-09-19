import { usePage } from '@inertiajs/react';
import { IPageProps } from '../interfaces/page.interface';

import { mapDatabaseRoleToUserRole } from '../layouts/config/menu.config';
import { TUserRole } from '../types/user-role.types';

/**
 * Hook to get current user roles from Inertia props
 * Use this in React components where you need user roles
 */
export const useCurrentUserRoles = (): TUserRole[] => {
    const { props } = usePage<IPageProps>();

    if (props.auth?.user?.roles) {
        const roles = props.auth.user.roles as string[];
        return roles.map(mapDatabaseRoleToUserRole);
    }

    // Fallback to empty array if no roles found
    return [];
};
