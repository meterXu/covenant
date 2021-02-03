import React from 'react'
import {inject,observer} from 'mobx-react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
@inject('store')
@observer
export default class CollapsedBtn extends React.Component{
    handleToggle = ()=>{
        this.props.onToggle(!this.props.collapsed)
    }
    render(){
        const color = this.props.store.theme==='default'?'#000000D9':'#FFFFFFD9'
        const Icon = this.props.collapsed?
        <MenuUnfoldOutlined onClick={this.handleToggle} style={{color: color, fontSize: '24px',position:'relative',top:'3px'}}/>
        :<MenuFoldOutlined onClick={this.handleToggle}  style={{color: color, fontSize: '24px',position:'relative',top:'3px'}}/>
        return (
            <>
            {Icon}
            </>
        )
    }
}
