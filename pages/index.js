import React from 'react'
import Head from 'next/head'
import Logo from "./components/Logo";
import {Button, Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import changeTheme from 'next-dynamic-antd-theme';
const { Header, Sider, Content } = Layout;

class Home extends React.Component{
    state = {
        collapsed: false,
        theme:'default'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    changeTheme = ()=>{
        const theme = this.state.theme == 'default' ? 'dark' : 'default';
        this.setState({ theme }, () => {
            changeTheme(theme);
        });
    }
    renderLight = (props) => (
        <div
            dangerouslySetInnerHTML={{
                __html: `
   <svg width="1em" height="1em" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <path
          fill="#1890FF"
          fill-rule="nonzero"
          d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z"
        ></path>
        <circle stroke="#FFF" stroke-width="1.5" cx="10.5" cy="10.5" r="4"></circle>
      </g>
    </svg>
        `,
            }}
        />
    );
    renderDark = (props) => (
        <div
            dangerouslySetInnerHTML={{
                __html: `
   <svg width="1em" height="1em" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <circle fill='#141414' cx="10.5" cy="10.5" r="10.5"></circle>
        <path
          d="M13.396 11c0-3.019-1.832-5.584-4.394-6.566A6.427 6.427 0 0111.304 4C15.002 4 18 7.135 18 11c0 3.866-2.998 7-6.698 7A6.42 6.42 0 019 17.566c2.564-.98 4.396-3.545 4.396-6.566z"
          fill="#FFF"
          fill-rule="nonzero"
        ></path>
      </g>
    </svg>
        `,
            }}
        />
    );

  render() {
    return (
        <div style={{ minHeight: '100vh' }}>
          <Head>
            <title>covenant</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main style={{ minHeight: '100vh' }}>
              <Layout>
                  <Sider style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={this.state.collapsed}>
                      <Logo/>
                      <Menu mode="inline" defaultSelectedKeys={['1']}>
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
                  <Layout>
                      <Header>
                          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                              onClick: this.toggle,
                          })}
                          <Icon onClick={this.changeTheme}
                                style={{'float':'right', fontSize: '32px'}}
                              component={this.state.theme == 'default' ? this.renderDark : this.renderLight}
                          />
                      </Header>
                      <Content
                          style={{
                              margin: '24px 16px',
                              padding: 24,
                              minHeight: 280,
                          }}
                      >
                          <Button>hello world</Button>
                      </Content>
                  </Layout>
              </Layout>
          </main>
        </div>
    )
  }
}

export default Home
