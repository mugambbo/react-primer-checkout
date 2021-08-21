import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Checkout from 'react-checkout-challenge';
import { PaymentTokenizationResponse } from 'react-checkout-challenge/dist/esm/helpers/PaymentToken';
import { PaymentMethods } from 'react-checkout-challenge/dist/esm/components/checkout/CheckoutContainer';
import Config from './config';

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

  const key = "lang";
  const location = window.location;
  const currentUrlParams = new URLSearchParams(location.search);
  const lang = currentUrlParams.get(key)?? 'en';

  const [token, setToken] = useState<PaymentTokenizationResponse>();
  const [error, setError] = useState<Error>();

  const onTokenizationComplete = (tokenRes: PaymentTokenizationResponse, err?: Error) => {
    if (err){
      setError(err);
    } else {
      setToken(tokenRes);
    }
  }

  if (error) return (
    <Container>
        <Title>Oops! Something went wrong</Title>
        <Caption>{error.message}</Caption>
    </Container>
  );

  if (token) return (
    <Container> 
          <Title>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/></svg>            
              <span style={{marginLeft: 12}}>Payment token generated successfully</span>
            </div>            
            <Caption>{token.token}</Caption>            
            <Caption>Issuer: {token?.paymentInstrumentData?.binData?.issuerName}</Caption>
          </Title>
    </Container>    
  )

  return (
    <Container> 
        <Title>Like what you see? Buy it!</Title>
        <Caption>It only costs 50 bucks</Caption>
        <Checkout
              clientToken={Config.PRIMER_CLIENT_TOKEN}
              allowPaymentMethods={[PaymentMethods.Card]}
              lang={lang}
              theme="light"
              amount={50}
              currency="£"
              btnStyles={{
                logoSrc: 'logo192.png'
              }}
              onTokenizationComplete={onTokenizationComplete}
              style={{width: '50%', marginTop: 24}} />
    </Container>
  );
}

export default App;
