import React from 'react'
import Head from 'next/head'
import Logo from "./components/Logo";
import { Button, Layout, Menu,Row,Col } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import ThemeBtn from './components/ThemeBtn'
import CollapsedBtn from './components/CollapsedBtn';
const { Header, Sider, Content } = Layout;

class Home extends React.Component {
    state = {
        collapsed: false
    };

    handleToggle = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    render() {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Head>
                    <title>covenant</title>
                    <link rel="icon" href="./favicon.ico" />
                </Head>
                <main style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Sider style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Logo />
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
                            <Header style={{padding:'0 18px 0 12px'}}>
                            <Row justify={'space-between'} align='middle'>
                                <Col span={1}>
                                    <CollapsedBtn collapsed={this.state.collapsed} onToggle={this.handleToggle}/>
                                </Col>
                                <Col span={21}>
                                    <div style={{fontSize:'24px'}}>易于使用的后端API模拟工具</div>
                                </Col>
                                <Col span={2} style={{textAlign:'right'}}>
                                    <ThemeBtn />
                                </Col>
                           </Row>
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
