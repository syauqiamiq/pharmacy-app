import { usePage } from '@inertiajs/react';
import type { BreadcrumbProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { useMenuItemsWithAuth } from './utils/menu.utils';

const { Header, Content, Footer, Sider } = Layout;

interface IDashboardLayoutProps {
    children: React.ReactNode;
    breadcrumbItems?: BreadcrumbProps['items'];
}

const DashboardLayout = ({ children, breadcrumbItems }: IDashboardLayoutProps) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { url } = usePage();

    const { topMenuItems, sideMenuItems, activeTopMenuKey, breadcrumbItems: autoBreadcrumbItems, shouldShowSidebar } = useMenuItemsWithAuth(url);

    // Use provided breadcrumb items or auto-generated ones
    const finalBreadcrumbItems = breadcrumbItems || autoBreadcrumbItems;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={[activeTopMenuKey]} items={topMenuItems} style={{ flex: 1, minWidth: 0 }} />
            </Header>
            <div style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={finalBreadcrumbItems} />
                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: '80vh' }}>
                    {shouldShowSidebar && (
                        <Sider breakpoint="lg" style={{ background: colorBgContainer }} width={200}>
                            <Menu mode="inline" selectedKeys={[url]} style={{ height: '100%' }} items={sideMenuItems} />
                        </Sider>
                    )}
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center' }}>Pharmacy App ©{new Date().getFullYear()} Created by Muhammad Syauqi Amiq Amrullah S.Kom.</Footer>
        </Layout>
    );
};

export default DashboardLayout;
