import React from 'react'
import changeTheme from 'next-dynamic-antd-theme';
import {DarkIcon,LightIcon} from './Icon'
class ThemeBtn extends React.Component{
    state = {
        theme:'default'
    }
    handleChangeTheme=()=>{
        const theme = this.state.theme === 'default' ? 'dark' : 'default';
        this.setState({ theme },()=>{
            changeTheme(theme);
        });
        
    }
    render() {
        const icon = this.state.theme==='dark'?<DarkIcon onClick={this.handleChangeTheme} style={{ color: '#FFFFFFD9',fontSize: '24px' }}/>:
                    <LightIcon onClick={this.handleChangeTheme} style={{ color: '#000000D9',fontSize: '24px' }}/>
        return (
           <>
                {icon}
           </>
        )
    }
}
export default ThemeBtn