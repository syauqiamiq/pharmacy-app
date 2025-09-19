import { TUserRole } from '../types/user-role.types';
import { useCurrentUserRoles } from './useCurrentUserRoles';

/**
 * Hook to check if current user has a specific role
 */
export const useHasRole = (role: TUserRole): boolean => {
    const userRoles = useCurrentUserRoles();
    return userRoles.includes(role);
};
