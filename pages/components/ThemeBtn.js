import React from 'react'
import {DarkIcon,LightIcon} from './Icon'
import changeTheme from '../../lib/themeplug'
import {inject,observer} from 'mobx-react'
@inject('store')
@observer
class ThemeBtn extends React.Component{
    state = {
        theme:'dark'
    }
    handleChangeTheme=()=>{
        const theme = this.state.theme === 'default' ? 'dark' : 'default';
        this.setState({ theme },()=>{
            changeTheme(theme)
        });

    }
    render() {
        const icon = this.props.store.theme==='dark'?
            <LightIcon onClick={this.handleChangeTheme} style={{ color: '#FFFFFFD9',fontSize: '24px',position:'relative',top:'3px' }}/>:
            <DarkIcon onClick={this.handleChangeTheme} style={{ color: '#000000D9',fontSize: '24px',position:'relative',top:'3px' }}/>
        return (
           <>
                {icon}
           </>
        )
    }
}
export default ThemeBtn
