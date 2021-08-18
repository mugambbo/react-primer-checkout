import React from 'react';
import './App.css';
import { Checkout } from './components/checkout';
import { PaymentMethods } from './components/checkout/CheckoutContainer';
import { BtnVariant } from './components/pay/PayButton';
import { PaymentTokenizationResponse } from './helpers/PaymentToken';

const clientToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjkwNjgzODgsImFjY2Vzc1Rva2VuIjoiMDM5NTU2NjYtM2I1ZS00ZGE0LTg2YWMtMGZjNmIzMDJlNjUwIiwiYW5hbHl0aWNzVXJsIjoiaHR0cHM6Ly9hbmFseXRpY3MuYXBpLnN0YWdpbmcuY29yZS5wcmltZXIuaW8vbWl4cGFuZWwiLCJpbnRlbnQiOiJDSEVDS09VVCIsImNvbmZpZ3VyYXRpb25VcmwiOiJodHRwczovL2FwaS5zdGFnaW5nLnByaW1lci5pby9jbGllbnQtc2RrL2NvbmZpZ3VyYXRpb24iLCJjb3JlVXJsIjoiaHR0cHM6Ly9hcGkuc3RhZ2luZy5wcmltZXIuaW8iLCJwY2lVcmwiOiJodHRwczovL3Nkay5hcGkuc3RhZ2luZy5wcmltZXIuaW8iLCJlbnYiOiJTVEFHSU5HIiwidGhyZWVEU2VjdXJlSW5pdFVybCI6Imh0dHBzOi8vc29uZ2JpcmRzdGFnLmNhcmRpbmFsY29tbWVyY2UuY29tL2NhcmRpbmFsY3J1aXNlL3YxL3NvbmdiaXJkLmpzIiwidGhyZWVEU2VjdXJlVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcWRHa2lPaUl5WTJFMFpqVmlPQzFqWlRBNUxUUTNPV0l0WWpnNFlTMDFOalZsTm1VM1pEbGpOR0VpTENKcFlYUWlPakUyTWpnNU9ERTVPRGdzSW1semN5STZJalZsWWpWaVlXVmpaVFpsWXpjeU5tVmhOV1ppWVRkbE5TSXNJazl5WjFWdWFYUkpaQ0k2SWpWbFlqVmlZVFF4WkRRNFptSmtOakE0T0RoaU9HVTBOQ0o5LlZuYktkOUZNV3hpbG5JRE1KdnZBdkpaVW1QZHN2bGtYTEZjVVNibWxCWmMiLCJwYXltZW50RmxvdyI6IkRFRkFVTFQifQ.TBJ0tPygyGw6uSkSaHhtuPatqOt-l94waqGnXn1m-Jg";


function App() {
  
  const handleTokenizationComplete = (token: PaymentTokenizationResponse, err: Error) => {
    if (!err){
      console.log("Token generated successfully: "+token.token, token);
    } else {
      console.log("Oops! Something went wrong", err);
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '450px', marginLeft: '16px'}}>
    <Checkout
      clientToken={clientToken}
      allowPaymentMethods={[PaymentMethods.Card]}
      lang="en"
      inputStyles={{}}
      theme="light"
      btnStyles={{
        logoSrc: "logo192.png",
        btnVariant: BtnVariant.large
      }}
      amount={50}
      currency="$"
      onTokenizationComplete={handleTokenizationComplete}
       />
      </div>       
  );
}

export default App;
