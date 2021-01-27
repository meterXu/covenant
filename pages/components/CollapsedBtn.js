import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
export default class CollapsedBtn extends React.Component{
    handleToggle = ()=>{
        this.props.onToggle(!this.props.collapsed)
    }
    render(){
        const Icon = this.props.collapsed?<MenuUnfoldOutlined onClick={this.handleToggle} style={{color: '#000000D9', fontSize: '24px',position:'relative',top:'3px'}}/>:<MenuFoldOutlined onClick={this.handleToggle}  style={{color: '#000000D9', fontSize: '24px',position:'relative',top:'3px'}}/>
        return (
            <>
            {Icon}
            </>
        )
    }
}