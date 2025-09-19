import { useCurrentUserRoles } from '@/lib/hooks/useCurrentUserRoles';
import { getCurrentUserRoles } from '../config/menu.config';

import { MenuUtils } from '../utils/menu.utils';

/**
 * Get top menu items based on current user roles
 * @returns Ant Design menu items for top navigation
 */
export const getTopMenuItems = () => {
    const userRoles = getCurrentUserRoles();
    return MenuUtils.getTopMenuItems(userRoles);
};

/**
 * Hook to get top menu items using current authenticated user roles
 */
export const useTopMenuItems = () => {
    const userRoles = useCurrentUserRoles();
    return MenuUtils.getTopMenuItems(userRoles);
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use getTopMenuItems or useTopMenuItems instead
 */
export const topMenu = getTopMenuItems();
