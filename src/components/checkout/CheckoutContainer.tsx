import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Analytics, { Events } from "../../adapter/Analytics";
import { CheckoutSDKPaths } from "../../config";
import { EXPIRY_MASK, MINIMUM_CARD_NUMBER_DIGITS } from "../../Constants";
import { applyFormatMask, buildPaymentInstrument, isCVCValid, isExpiryValid, numbersOnlyString, whatCardType } from "../../helpers/CardHelper";
import { Card, CardTypes } from "../../helpers/CardTypes";
import CheckoutFetch from "../../helpers/CheckoutFetch";
import I18nHelper from "../../helpers/I18nHelper";
import { PaymentTokenizationResponse } from "../../helpers/PaymentToken";
import { InputFields } from "../card/CardField";
import CheckoutFormUI from "./CheckoutFormUI";
import { BtnVariant } from "../pay/PayButton";
import I18nProvider, { useI18nContext } from "../../i18n/I18nContext";


export enum PaymentMethods { 
    Card, /** Credit card type */
    Paypal /** Paypal type */
};

export interface CheckoutProps {
    readonly lang?: string; /** Language to use for strings e.g. en */
    readonly amount?: number; /** Amount to display beside the pay button */
    readonly currency?: string; /** The currency to display beside the amount */
    readonly policy?: ReactNode; /** Policy statement or terms of service to display between the form and button */
    readonly btnStyles?: PayButtonStyles; /** Styles to applied to the pay button */
    readonly allowPaymentMethods: Array<PaymentMethods>; /** Payment methods to support at checkout */
    readonly clientToken: string; /** The client token to use for authenticating the payment */
    readonly inputStyles?: object; /** Styles to be applied to the input fields */
    readonly theme?: "dark" | "light"; /** Theme to use for the overall interface */
    readonly style?: object; /** Style to be applied to the form element */
    onTokenizationComplete(tokenRes: PaymentTokenizationResponse | undefined, err?: Error): void; /** Callback function executed when token generation request is complete */
}

export interface PayButtonStyles {
    readonly logoSrc?: string; /** File path of a logo to use beside the Pay button */
    readonly btnVariant?: BtnVariant; /** A size variant of the pay button */
    readonly style?: object /** Styles to be applied to the pay button */
}

function CheckoutContainer(props: CheckoutProps): ReactElement {

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [cardType, setCardType] = useState<Card>(CardTypes.GENERIC);
    const [cardNameError, setCardNameError] = useState("");
    const [cardErrors, setCardErrors] = useState({
        cardNumber: "",
        cardCVC: "",
        cardExpiry: ""
    });

    useEffect(() => {
        Analytics.track(Events.START, {
            timestamp: new Date().toISOString()
        });
        return () => {
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const contentString = useI18nContext();

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const eventName = e.target.name;
        if (eventName === InputFields.CardNumber) { //Validate card number
            const theCardNumbersOnly = numbersOnlyString(e.target.value);
            const theCardType = whatCardType(theCardNumbersOnly);
            const theCardNumberFormatted = applyFormatMask(theCardNumbersOnly, theCardType?.mask);
            setCardType(theCardType? theCardType: CardTypes.GENERIC);
            setCardNumber(theCardNumberFormatted.trim());
            if (theCardType && theCardType.mask.length === theCardNumberFormatted.length) {
                setCardErrors({...cardErrors, cardNumber: ""});
            } else if (theCardNumbersOnly.length >= MINIMUM_CARD_NUMBER_DIGITS) {
                setCardErrors({...cardErrors, cardNumber: I18nHelper.formatString(contentString.error_valid_card)});
            } else {
                setCardErrors({...cardErrors, cardNumber: ""});
            }
        } else if (eventName === InputFields.CardExpiry) { //Validate card expiry date
            const theCardExpiry = e.target.value;
            const theCardExpiryNumbersOnly = numbersOnlyString(theCardExpiry);
            if (theCardExpiryNumbersOnly.length <= 2) {
                setCardExpiry(theCardExpiry.replace(" / ", "").trim());
                setCardErrors({...cardErrors, cardExpiry: ""});
                
            } else if (theCardExpiryNumbersOnly.length > 2) {
                const theCardExpiryFormatted = applyFormatMask(theCardExpiryNumbersOnly, EXPIRY_MASK);
                const theCardExpiryFormattedClean = theCardExpiryFormatted.trim();
                setCardExpiry(theCardExpiryFormattedClean);

                if (theCardExpiryNumbersOnly.length >= 4) {
                    const monthYear = theCardExpiryFormattedClean.split("/");
                    const month = monthYear[0].trim();
                    const year = monthYear[1].trim();
                    if (isExpiryValid(month, year)) {
                        setCardErrors({...cardErrors, cardExpiry: ""});
                    } else {
                        setCardErrors({...cardErrors, cardExpiry: I18nHelper.formatString(contentString.error_valid_expiry)});
                    }
                }
            }
        } else if (eventName === InputFields.CardCVC) { //Validate card holder name
            const theCardCVC = e.target.value;
            const theCardCVCNumbersOnly = numbersOnlyString(theCardCVC);
            setCardCVC(theCardCVCNumbersOnly);
            if (isCVCValid(theCardCVCNumbersOnly, cardType)){
                setCardErrors({...cardErrors, cardCVC: ""})
            } else {
                setCardErrors({...cardErrors, cardCVC: I18nHelper.formatString(contentString.error_valid_cvc)});
            }
        }
    }

    const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const theCardHolderName = event.target.value;
        const re = new RegExp("^[a-zA-Z]+[a-zA-Z]+$");
        setCardName(theCardHolderName);
        if (theCardHolderName.trim().match(re) != null) {
            setCardNameError(I18nHelper.formatString(contentString.error_card_name));
        } else {
            setCardNameError("");
        }
    }

    const handlePay = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        if (cardErrors.cardNumber || cardErrors.cardExpiry || cardErrors.cardCVC || cardNameError) return;
        try {
            const data = buildPaymentInstrument(cardNumber, cardCVC, cardExpiry, cardName);
            const tokenRes: PaymentTokenizationResponse = await CheckoutFetch.post(CheckoutSDKPaths.PAYMENT_INSTRUMENT, props.clientToken, data);
            props.onTokenizationComplete(tokenRes);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            props.onTokenizationComplete(undefined, err.error?? err);
        }

        Analytics.track(Events.PAY, {
            initials: cardName.split(" ")[0].trim() + cardName.split(" ")[1].trim(),
            cardLastDigits: cardNumber.substring(cardNumber.length - 5, cardNumber.length)
        });
    }

    return (
        <I18nProvider lang={props.lang}>
            <CheckoutFormUI 
                cardName={cardName} 
                cardNumber={cardNumber} 
                cardExpiry={cardExpiry} 
                cardCVC={cardCVC} 
                cardErrors={cardErrors}
                cardNameError={cardNameError}
                cardType={cardType}
                onCardChange={handleCardChange}
                onCardNameChange={handleCardNameChange}
                onPay={handlePay}
                loading={loading}
                {...props} />
        </I18nProvider>                
    );
}
  

export default CheckoutContainer;