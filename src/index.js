import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { AppProvider } from './components/context'
import { Provider } from 'react-redux'
import store from './store'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100000,
  },
}
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
