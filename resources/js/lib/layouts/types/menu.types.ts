import { TUserRole } from '@/lib/types/user-role.types';
import { MenuProps } from 'antd';
import { ReactNode } from 'react';

// Menu item interface extending Ant Design's MenuProps
export interface MenuItemConfig {
    key: string;
    label: string;
    icon?: ReactNode;
    route?: string;
    roles: TUserRole[];
    children?: MenuItemConfig[];
    onClick?: () => void;
}

// Top menu item interface - for navigation between main sections
export interface TopMenuItemConfig {
    key: string;
    label: string;
    route?: string;
    roles: TUserRole[];
    children?: SideMenuItemConfig[];
}

// Side menu item interface - for sub-navigation within a section
export interface SideMenuItemConfig {
    key: string;
    label: string;
    icon?: ReactNode;
    route: string;
    roles: TUserRole[];
    parentKey?: string;
}

// Menu configuration interface
export interface MenuConfig {
    topMenu: TopMenuItemConfig[];
    sideMenu: SideMenuItemConfig[];
}

// Ant Design menu item type
export type AntMenuItem = Required<MenuProps>['items'][number];

// Menu utility functions interface
export interface MenuUtils {
    getTopMenuItems: (userRoles: TUserRole[]) => AntMenuItem[];
    getSideMenuItems: (userRoles: TUserRole[], activeTopMenu?: string) => AntMenuItem[];
    hasAccess: (requiredRoles: TUserRole[], userRoles: TUserRole[]) => boolean;
}
