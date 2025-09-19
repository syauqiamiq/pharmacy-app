import { useCurrentUserRoles } from '@/lib/hooks/useCurrentUserRoles';
import { getCurrentUserRoles } from '../config/menu.config';

import { MenuUtils } from '../utils/menu.utils';

/**
 * Get sidebar menu items based on current user roles and active section
 * @param activeTopMenu - The active top menu key to filter sidebar items
 * @returns Ant Design menu items for sidebar
 */
export const getSideBarItems = (activeTopMenu?: string) => {
    const userRoles = getCurrentUserRoles();
    return MenuUtils.getSideMenuItems(userRoles, activeTopMenu);
};

/**
 * Hook to get sidebar items using current authenticated user roles
 */
export const useSideBarItems = (activeTopMenu?: string) => {
    const userRoles = useCurrentUserRoles();
    return MenuUtils.getSideMenuItems(userRoles, activeTopMenu);
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use getSideBarItems or useSideBarItems instead
 */
export const sideBar = getSideBarItems();
