import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Checkout } from './components/checkout';
import { PaymentMethods } from './components/checkout/CheckoutContainer';

ReactDOM.render(
  <React.StrictMode>
    <Checkout
      clientToken={""}
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