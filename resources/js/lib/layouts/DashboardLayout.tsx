import { usePage } from '@inertiajs/react';
import type { BreadcrumbProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { sideBar } from './side-bar/side-bar';
import { topMenu } from './top-menu/top-menu';

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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[url.split('/').length > 2 ? url.split('/')[1] : url]}
                    items={topMenu}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <div style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: '80vh' }}>
                    {url !== '/dashboard' && (
                        <Sider breakpoint="lg" style={{ background: colorBgContainer }} width={200}>
                            <Menu mode="inline" defaultSelectedKeys={[url]} style={{ height: '100%' }} items={sideBar} />
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
