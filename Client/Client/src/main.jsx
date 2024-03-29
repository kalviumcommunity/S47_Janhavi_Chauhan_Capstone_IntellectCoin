import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
    domain="dev-qpwxwlzkanw3hd2k.us.auth0.com"
    clientId="JMch1qazOESQWEE37jPPcvG4IKxx0bw6"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}
    >
    <App />
  </Auth0Provider>
  </>
    

)
