import './styles/global.less'
import { Provider } from 'mobx-react'
import { useStore } from '../lib/store'
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
