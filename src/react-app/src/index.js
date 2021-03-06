import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto'

import Amplify from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'

Amplify.configure({
  region: 'us-west-2',
  userPoolId: 'us-west-2_YYIFjVCCc',
  userPoolWebClientId: '3sbmi30ihb0p81nooijb40vuad'
})

ReactDOM.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
