import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ui/theme-provider.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>
  </Provider>,
)
