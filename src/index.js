import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { AppProvider } from './components/context'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <React.StrictMode>

    <AppProvider>
       <Provider store={store}>
      <App />
       </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
