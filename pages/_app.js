import './styles/global.less'
import { Provider } from 'mobx-react'
import { useStore } from '../lib/store'
function MyApp({ Component, pageProps }) {
  const store = useStore()
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp
