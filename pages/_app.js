import './styles/global.less'
import { Provider } from 'mobx-react'
import { useStore } from '../lib/store'
import { useEffect } from 'react'
import changeTheme from '../lib/themeplug'
function MyApp({ Component, pageProps }) {
  const store = useStore()
  useEffect(()=>{
    if(store.theme!=='dark'){
      changeTheme(store.theme)
    }
  },[store.theme])
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
