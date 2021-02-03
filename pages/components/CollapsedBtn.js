import React from 'react'
import {inject,observer} from 'mobx-react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import '../styles/module.collapsedBtn.less'
@inject('store')
@observer
export default class CollapsedBtn extends React.Component{
    handleToggle = ()=>{
        this.props.onToggle(!this.props.collapsed)
    }
    render(){
        const darkStyle = this.props.store.theme==='default'?'':'collapsed-btn-dark'
        const Icon = this.props.collapsed?
        <MenuUnfoldOutlined onClick={this.handleToggle} className={['collapsed-btn',darkStyle]} />
        :<MenuFoldOutlined onClick={this.handleToggle}  className={['collapsed-btn',darkStyle]}/>
        return (
            <>
            {Icon}
            </>
        )
    }
}
