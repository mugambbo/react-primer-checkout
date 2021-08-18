import React, { ReactNode } from 'react';
import { Card } from '../../helpers/CardTypes';
import { PayButtonStyles } from './CheckoutContainer';
import PayButton from '../pay/PayButton';
import CardField from '../card';
import CardName from '../holder';

interface CheckoutFormUIProps {
  readonly btnStyles?: PayButtonStyles;
  readonly amount?: number;
  readonly currency?: string;
  readonly style?: object;
  readonly policy?: ReactNode;
  readonly cardNumber: string;
  readonly cardExpiry: string;
  readonly cardCVC: string;
  readonly cardName: string;
  readonly cardErrors: object;
  readonly inputStyles?: object;
  readonly cardNameError: string;
  readonly cardType: Card;
  readonly loading: boolean;
  onCardNameChange(event: React.ChangeEvent): void;
  onCardChange(event: React.ChangeEvent): void
  onPay?(event: React.FormEvent<HTMLFormElement>): void;
}

function CheckoutFormUI({btnStyles, amount, currency, style, policy: Policy, cardType, cardName, cardNumber, cardExpiry, cardCVC, cardNameError, cardErrors, inputStyles, loading, onCardNameChange, onCardChange, onPay}: CheckoutFormUIProps) {
  const primaryError = Object.values(cardErrors).filter((val) => !!val)[0]?? cardNameError;

  return (
    <form className="full-width" style={{minWidth: '400px', ...style }} onSubmit={onPay} >
      <div className="form-subcontainer" >
        <CardName loading={loading} cardName={cardName} inputStyles={{...inputStyles}} onCardNameChange={onCardNameChange} />
        <CardField loading={loading} cardType={cardType} cardNumber={cardNumber} cardExpiry={cardExpiry} cardCVC={cardCVC} inputStyles={inputStyles} onCardChange={onCardChange} />
        {Policy}
        <PayButton loading={loading} btnStyles={btnStyles} amount={amount} currency={currency} />
        <span className={primaryError? "helper-error": "helper"}>{primaryError}</span>
      </div>
    </form>
  )
}

export default CheckoutFormUI;