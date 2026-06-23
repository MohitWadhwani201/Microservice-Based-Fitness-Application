import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig.js'
import { BrowserRouter } from 'react-router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<>
  <BrowserRouter>
  <AuthProvider authConfig={authConfig}
          loadingComponent={<div>Loading...</div>}>
  <Provider store={store}>
    <App />
  </Provider>
    </AuthProvider>
    </BrowserRouter>
  </>
)
