import * as React from 'react'
import * as ReactDOM from 'react-dom'
import store from "@/store"
import { Provider } from 'react-redux'
import RouterMap from '@/router/routerMap'
import * as serviceWorker from './serviceWorker'

import 'static/reset.css'

ReactDOM.render(
	<Provider store={store}>
  	<RouterMap />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
setTimeout

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
