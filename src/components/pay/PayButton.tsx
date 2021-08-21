import React from 'react'
import I18nHelper from '../../helpers/I18nHelper';
import { useI18nContext } from '../../i18n/I18nContext'
import { PayButtonStyles } from '../checkout/CheckoutContainer'


interface PayButtonProps {
    btnStyles?: PayButtonStyles;
    loading: boolean;
    amount?: number;
    currency?: string;
}

export enum BtnVariant {
  small,
  large
}

function PayButton({ btnStyles, amount, currency, loading }: PayButtonProps) {

  const contentString = useI18nContext();

    return (
        <button id="pay" type="submit" className={"pay-btn" + (btnStyles?.btnVariant === BtnVariant.small? " pay-btn-small": "") + (loading? " pay-btn-loading": "")} style={{...btnStyles?.style}} disabled={loading} >
          {loading? (
          <div className="checkout-center">
            <div className="dot-windmill" role="progressbar" aria-valuetext={I18nHelper.formatString(contentString.aria_pay_status)} ></div>
          </div>
          ): (
            <div className="checkout-center">
              <img style={{marginRight: 8}} src={btnStyles?.logoSrc} height="24px" alt="" />{I18nHelper.formatString(contentString.pay, {0: currency, 1: amount})}
            </div>
          )}
        </button>
    )
}

export default PayButton
