import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
export default class CollapsedBtn extends React.Component{
    render(){
        const Icon = this.props.collapsed?<MenuUnfoldOutlined style={{color: '#FFFFFFD9', fontSize: '24px'}}/>:<MenuFoldOutlined style={{color: '#000000D9', fontSize: '24px'}}/>
        return (
            <>
            {Icon}
            </>
        )
    }
}