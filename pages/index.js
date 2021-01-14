import styles from '../styles/Home.module.css'
import React from 'react'
import Head from 'next/head'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

class Home  extends React.Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

  render() {
    return (
        <div className={styles.container}>
          <Head>
            <title>covenant</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
              <Layout>
                  <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                      <div className={styles.logo} />
                      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                          <Menu.Item key="1" icon={<UserOutlined />}>
                              nav 1
                          </Menu.Item>
                          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                              nav 2
                          </Menu.Item>
                          <Menu.Item key="3" icon={<UploadOutlined />}>
                              nav 3
                          </Menu.Item>
                      </Menu>
                  </Sider>
                  <Layout className={styles['site-layout']}>
                      <Header className={styles['site-layout-background']} style={{ padding: 0 }}>
                          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                              className: styles.trigger,
                              onClick: this.toggle,
                          })}
                      </Header>
                      <Content
                          className={styles['site-layout-background']}
                          style={{
                              margin: '24px 16px',
                              padding: 24,
                              minHeight: 280,
                          }}
                      >
                          Content
                      </Content>
                  </Layout>
              </Layout>
          </main>
        </div>
    )
  }
}

export default Home