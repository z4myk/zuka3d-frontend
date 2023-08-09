import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store'
import { Provider } from 'react-redux'
import * as bootstrap from 'bootstrap'
import {CartProvider} from './context/CartContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
  <CartProvider>
    <App />
  </CartProvider>
      </Provider>
  </React.StrictMode>,
)
