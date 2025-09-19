import { router } from '@inertiajs/react';
import { menuConfig } from '../config/menu.config';

import { useCurrentUserRoles } from '@/lib/hooks/useCurrentUserRoles';
import { TUserRole } from '@/lib/types/user-role.types';
import type { AntMenuItem, SideMenuItemConfig, TopMenuItemConfig } from '../types/menu.types';

/**
 * Utility class for menu operations
 */
export class MenuUtils {
    /**
     * Check if user has access to a menu item based on roles
     */
    static hasAccess(requiredRoles: TUserRole[], userRoles: TUserRole[]): boolean {
        return requiredRoles.some((role) => userRoles.includes(role));
    }

    /**
     * Convert top menu config to Ant Design menu items
     */
    static getTopMenuItems(userRoles: TUserRole[]): AntMenuItem[] {
        return menuConfig.topMenu.filter((item) => this.hasAccess(item.roles, userRoles)).map((item) => this.convertToAntMenuItem(item));
    }

    /**
     * Get sidebar menu items based on user roles and active top menu
     */
    static getSideMenuItems(userRoles: TUserRole[], activeTopMenu?: string): AntMenuItem[] {
        const filteredItems = menuConfig.sideMenu.filter((item) => {
            // Check role access
            const hasRoleAccess = this.hasAccess(item.roles, userRoles);

            // If activeTopMenu is specified, only show items for that section
            if (activeTopMenu && item.parentKey) {
                return hasRoleAccess && item.parentKey === activeTopMenu;
            }

            return hasRoleAccess;
        });

        return filteredItems.map((item) => this.convertSideMenuToAntMenuItem(item));
    }

    /**
     * Get the active top menu key based on current URL
     */
    static getActiveTopMenuKey(currentUrl: string): string {
        // Remove leading slash and get first segment
        const segments = currentUrl.replace(/^\//, '').split('/');

        if (segments.length === 1 && segments[0] === 'dashboard') {
            return 'dashboard';
        }

        // For paths like /doctor/dashboard, /admin/patient, etc.
        if (segments.length >= 2) {
            return segments[0]; // doctor, admin, pharmacist
        }

        return 'dashboard';
    }

    /**
     * Get breadcrumb items based on current route
     */
    static getBreadcrumbItems(currentUrl: string, userRoles: TUserRole[]) {
        const segments = currentUrl.replace(/^\//, '').split('/').filter(Boolean);

        if (segments.length === 0 || (segments.length === 1 && segments[0] === 'dashboard')) {
            return [{ title: 'Dashboard' }];
        }

        const items = [{ title: 'Dashboard' }];

        // Add top menu item
        if (segments.length >= 1) {
            const topMenuItem = menuConfig.topMenu.find((item) => item.key === segments[0] && this.hasAccess(item.roles, userRoles));
            if (topMenuItem) {
                items.push({ title: topMenuItem.label });
            }
        }

        // Add side menu item
        if (segments.length >= 2) {
            const fullPath = `/${segments.join('/')}`;
            const sideMenuItem = menuConfig.sideMenu.find((item) => item.route === fullPath && this.hasAccess(item.roles, userRoles));
            if (sideMenuItem) {
                items.push({ title: sideMenuItem.label });
            }
        }

        return items;
    }

    /**
     * Check if sidebar should be shown for current route
     */
    static shouldShowSidebar(currentUrl: string): boolean {
        // Don't show sidebar on main dashboard
        if (currentUrl === '/dashboard' || currentUrl === '/') {
            return false;
        }

        // Show sidebar for all other routes that have sub-menus
        const activeTopMenu = this.getActiveTopMenuKey(currentUrl);
        const hasSideMenuItems = menuConfig.sideMenu.some((item) => item.parentKey === activeTopMenu);

        return hasSideMenuItems;
    }

    /**
     * Convert top menu config to Ant Design menu item
     */
    private static convertToAntMenuItem(item: TopMenuItemConfig): AntMenuItem {
        return {
            key: item.key,
            label: item.label,
            onClick: () => {
                if (item.route) {
                    router.get(item.route);
                }
            },
        };
    }

    /**
     * Convert side menu config to Ant Design menu item
     */
    private static convertSideMenuToAntMenuItem(item: SideMenuItemConfig): AntMenuItem {
        return {
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => {
                router.get(item.route);
            },
        };
    }
}

/**
 * Hook for getting menu items based on user roles
 */
export const useMenuItems = (userRoles: TUserRole[], currentUrl: string) => {
    const activeTopMenu = MenuUtils.getActiveTopMenuKey(currentUrl);

    return {
        topMenuItems: MenuUtils.getTopMenuItems(userRoles),
        sideMenuItems: MenuUtils.getSideMenuItems(userRoles, activeTopMenu),
        activeTopMenuKey: activeTopMenu,
        breadcrumbItems: MenuUtils.getBreadcrumbItems(currentUrl, userRoles),
        shouldShowSidebar: MenuUtils.shouldShowSidebar(currentUrl),
    };
};

/**
 * Hook for getting menu items using current authenticated user roles
 * This hook automatically gets user roles from Inertia props
 */
export const useMenuItemsWithAuth = (currentUrl: string) => {
    const userRoles = useCurrentUserRoles();
    return useMenuItems(userRoles, currentUrl);
};
