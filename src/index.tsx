import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Checkout } from './components/checkout';
import { PaymentMethods } from './components/checkout/CheckoutContainer';

const SAMPLE_CLIENT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mjk3NDIxODIsImFjY2Vzc1Rva2VuIjoiZjZhODczNDgtOGJiZi00OTg4LWIxMTUtNDFjOWFjZDIxMGEwIiwiYW5hbHl0aWNzVXJsIjoiaHR0cHM6Ly9hbmFseXRpY3MuYXBpLnN0YWdpbmcuY29yZS5wcmltZXIuaW8vbWl4cGFuZWwiLCJpbnRlbnQiOiJDSEVDS09VVCIsImNvbmZpZ3VyYXRpb25VcmwiOiJodHRwczovL2FwaS5zdGFnaW5nLnByaW1lci5pby9jbGllbnQtc2RrL2NvbmZpZ3VyYXRpb24iLCJjb3JlVXJsIjoiaHR0cHM6Ly9hcGkuc3RhZ2luZy5wcmltZXIuaW8iLCJwY2lVcmwiOiJodHRwczovL3Nkay5hcGkuc3RhZ2luZy5wcmltZXIuaW8iLCJlbnYiOiJTVEFHSU5HIiwidGhyZWVEU2VjdXJlSW5pdFVybCI6Imh0dHBzOi8vc29uZ2JpcmRzdGFnLmNhcmRpbmFsY29tbWVyY2UuY29tL2NhcmRpbmFsY3J1aXNlL3YxL3NvbmdiaXJkLmpzIiwidGhyZWVEU2VjdXJlVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcWRHa2lPaUkyTXpJeE5XVmlaQzB6T1dJeUxUUTJOMk10WVRFMFlpMWlNelZpTTJKaFptUXhaV01pTENKcFlYUWlPakUyTWprMk5UVTNPRElzSW1semN5STZJalZsWWpWaVlXVmpaVFpsWXpjeU5tVmhOV1ppWVRkbE5TSXNJazl5WjFWdWFYUkpaQ0k2SWpWbFlqVmlZVFF4WkRRNFptSmtOakE0T0RoaU9HVTBOQ0o5Li1ybWtIejFJU2VOV0Uwd0ViY3VrSWxpdzFaNl9Yb3lPLVNnUmR4QjZkTmMiLCJwYXltZW50RmxvdyI6IkRFRkFVTFQifQ.H3CBOP3uIvuIiwT5P4gMVpud80_ZJVpQs2DGMnMSqOE";

ReactDOM.render(
  <React.StrictMode>
    <Checkout
      clientToken={SAMPLE_CLIENT_TOKEN}
      allowPaymentMethods={[PaymentMethods.Card]}
      lang="en"
      theme="light"
      amount={50}
      currency="$"
      onTokenizationComplete={() => {}}
       />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default Checkout;