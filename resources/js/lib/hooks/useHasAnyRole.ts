import { TUserRole } from '../types/user-role.types';
import { useCurrentUserRoles } from './useCurrentUserRoles';

/**
 * Hook to check if current user has any of the specified roles
 */
export const useHasAnyRole = (roles: TUserRole[]): boolean => {
    const userRoles = useCurrentUserRoles();
    return roles.some((role) => userRoles.includes(role));
};
