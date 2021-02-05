import React from 'react'
import {DarkIcon,LightIcon} from './Icon'
import changeTheme from '../../lib/themeplug'
import {inject,observer} from 'mobx-react'
import '../styles/module.themeBtn.less'
@inject('store')
@observer
class ThemeBtn extends React.Component{
    state = {
    }
    handleChangeTheme=()=>{
        const theme = this.props.store.theme === 'default' ? 'dark' : 'default';
        this.props.store.setTheme(theme)
        this.setState({ theme },()=>{
            debugger
            changeTheme(theme)
        });

    }
    render() {
        const icon = this.props.store.theme==='dark'?
            <LightIcon onClick={this.handleChangeTheme} className={['theme-btn','light-icon']}/>:
            <DarkIcon onClick={this.handleChangeTheme} className={['theme-btn','dark-icon']}/>
        return (
           <>
                {icon}
           </>
        )
    }
}
export default ThemeBtn
