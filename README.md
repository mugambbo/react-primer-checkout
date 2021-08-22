# React Primer Checkout
<div align="center">
  <a href="https://www.npmjs.com/package/react-checkout-challenge">
    <img alt="React Checkout Challenge" src="https://github.com/mugambbo/react-primer-checkout/raw/master/react-checkout-example/public/logo192.png" height="150px" />
  </a>
</div>

<div align="center">
  <strong>With React Primer Checkout, accepting payments on your react app just got easier</strong>
  <div><small>Pick from a wide range of payment instruments: Credit Card, PayPal, Apple Pay, Google Pay, etc.</small></div>
  <br />
  <br />
  <a href="https://www.npmjs.com/package/react-checkout-challenge"><img src="https://img.shields.io/badge/npm-v7.21.0-blue" alt="Node version"></a>
  <a href="https://www.npmjs.com/package/react-checkout-challenge"><img src="https://img.shields.io/badge/size-111.69kb-green" alt="Unzipped library size"></a>
  <a href="https://www.npmjs.com/package/react-checkout-challenge"><img src="https://img.shields.io/badge/react-17.0.2-aqua" alt="React library"></a>
</div>

[![build-status](https://circleci.com/gh/mugambbo/react-primer-checkout.svg?style=svg&circle-token=30613acf3eecb26fd92ad1ad58920187cf8e7692)](https://app.circleci.com/pipelines/github/mugambbo/react-primer-checkout)

---

![React Primer Checkout Screenshot](https://github.com/mugambbo/react-primer-checkout/raw/master/react-checkout-example/public/img1.png "React Primer Checkout Screenshot")

---

## About
React Primer Checkout is a react library that provides merchants with the tools required to easily collect payment information and generate access tokens using APIs from primer.io. 
This package contains:
- [The React library](https://github.com/mugambbo/react-primer-checkout)
- [An Example App](https://github.com/mugambbo/react-primer-checkout/tree/master/react-checkout-example)
- Typescript declarations

**Note: This package was engineered to be used in a staging environment only.**

## Getting Started
Before you begin, do create an account on primer.io so as to obtain your API key. Your API key will be used to generate an API token which is required by this library before payments can be initiated. See Primer API docs [here](https://primer.io/docs/api/) to learn more.

## Installation

## The React Library
In the project directory, run:
```sh
$ npm install react-checkout-challenge
```


## Usage
```JSX
import React from 'react';
import styled from 'styled-components';
import Checkout from 'react-checkout-challenge';
import { PaymentTokenizationResponse } from 'react-checkout-challenge/dist/esm/helpers/PaymentToken';
import { PaymentMethods } from 'react-checkout-challenge/dist/esm/components/checkout/CheckoutContainer';

//Using styled-components (not required)
const Container = styled.div`
    width: 100%;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;`;

const Title = styled.div`
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;`;

const Caption = styled.div`
    font-size: 1.2em;
    font-weight: 300;
    color: grey;
    text-align: center;`;

function App() {

    const PRIMER_CLIENT_TOKEN = "your-client-token-here";
    const onTokenizationComplete = (tokenRes: PaymentTokenizationResponse, err?: Error) => {
        console.log(tokenRes);
    }

  return (
    <Container> 
        <Title>Like what you see? Buy it!</Title>
        <Caption>It only costs 50 bucks</Caption>
        <Checkout
              clientToken={PRIMER_CLIENT_TOKEN}
              allowPaymentMethods={[PaymentMethods.Card]}
              lang={lang}
              amount={50}
              currency="£"
              btnStyles={{
                logoSrc: 'logo.png'
              }}
              onTokenizationComplete={onTokenizationComplete}
              style={{width: '50%'}} />
    </Container>
  );
}

export default App;
```

## Checkout Props
Here is a list of properties that can be used with the checkout library:
| Properties            | Description                            |
| :-------------: |-------------|
| `lang`      | `optional` Language to use for the checkout component e.g. `fr`. Defaults to english `en`. This library currently supports `fr` and `en` languages |
| `amount`      | `optional` Value to display beside the pay button e.g. `150`     |
| `currency` | `optional` The currency to display on the pay button, beside the amount e.g. `$`     |
| `policy` | `optional` Terms or policy statement to display between the form and button. This is typically a React Node e.g. `<div>Terms and conditionals apply. Click here to learn more</div>`     |
| `btnStyles` | `optional` A styling object used to customize the pay button. Supports three attributes: 1. `logoSrc` The url to an icon; 2. `btnVariant` A size variant of the pay button. It can be either `large` or `small` instances of `BtnVariant` 3. `style` The css style to be applied to the `button` component |
| `allowPaymentMethods` | `required` An array of `PaymentMethods` you prefer to support on your app. Current methods supported include Credit Cards and PayPal (WIP).   |
| `clientToken` | `required` A token you have generated by calling the primer API endpoint via your backend - `/auth/client-token` e.g. eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NUb2tlbiI6ImYwOTZkNjMzLTM1Y...h9CzttPQ7mb3JaaSMQVo1QUSs  |
| `inputStyles` | `optional` An object of css styles to be used on all input fields  |
| `theme` | `optional` Theme to use for the overall interface. It can be `dark` or `light`  |
| `style` | `optional` CSS Style object to use on the parent `form` component  |
| `onTokenizationComplete` | `required` Callback function executed with the following arguments: [`PaymentTokenizationResponse`](https://primer.io/docs/api/#tag/Client-Tokens) and [`Error`](https://primer.io/docs/api/#section/API-Response-Status-Codes), when the access token generation request is complete  |

## Sample Tokenization Response
```JSON
{
   "deleted":false,
   "createdAt":"2021-05-04T09:33:52.293855",
   "updatedAt":"2021-05-04T09:33:52.293855",
   "deletedAt":null,
   "token":"alooYT5lS4m2JdL60rNo9nwxNjIwMTIwODMy",
   "analyticsId":"-NxZbWYcXPiRMynOCdzu2G5L",
   "tokenType":"SINGLE_USE",
   "paymentInstrumentType":"PAYMENT_CARD",
   "paymentInstrumentData":{
      "last4Digits":"1111",
      "expirationMonth":"03",
      "expirationYear":"2030",
      "cardholderName":"J Doe",
      "network":"Visa",
      "isNetworkTokenized":false,
      "binData":{
         "network":"VISA",
         "issuerCountryCode":"US",
         "issuerName":"JPMORGAN CHASE BANK, N.A.",
         "issuerCurrencyCode":null,
         "regionalRestriction":"UNKNOWN",
         "accountNumberType":"UNKNOWN",
         "accountFundingType":"UNKNOWN",
         "prepaidReloadableIndicator":"NOT_APPLICABLE",
         "productUsageType":"UNKNOWN",
         "productCode":"VISA",
         "productName":"VISA"
      }
   },
   "vaultData":null,
   "threeDSecureAuthentication":null
} 
```

**See [API Documentation](https://primer.io/docs/api) to learn more**

Want to see how it works? Install the Example App in this package.
<br />
<br />

## The Example App
The example app was bootstrapped using create-react-app. To run it, execute the following commands on your terminal:
1. `$ git clone https://github.com/mugambbo/react-primer-checkout.git`
2. `$ cd react-checkout-example`
3. `$ npm install`
4. `$ npm start`

**Click [here](https://react-primer-checkout.surge.sh/) or [here](https://react-primer-checkout.netlify.app/) to see a live demo**

## Minimum Requirements
This react package supports a minimum React version of v16.8.

## Contributing
If you want to contribute to [react-checkout-challenge](https://github.com/mugambbo/react-primer-checkout), feel free to fork this repository, create a new branch, make changes and create a pull request. It's that simple!

## Notes
**This react library is part of the Primer.io React Checkout Challenge**

