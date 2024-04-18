import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import AuthContextProvider from './components/Context/AuthContext.jsx';
import ChatContextProvider from './components/Context/ChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-qpwxwlzkanw3hd2k.us.auth0.com"
      clientId="JMch1qazOESQWEE37jPPcvG4IKxx0bw6"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AuthContextProvider> 
        <ChatContextProvider> 
          <App />
        </ChatContextProvider>
      </AuthContextProvider>
    </Auth0Provider>
  </Provider>
);
