import React, { ReactElement, useEffect, useState } from 'react'
import { Card } from '../../helpers/CardTypes';
import I18nHelper from '../../helpers/I18nHelper';
import { useI18nContext } from '../../i18n/I18nContext';
import { Amex, Diners, Discover, Generic, Hipercard, JCB, Maestro, MasterCard, UnionPay, VerveCard, VisaCard } from '../svg/CreditCards';

export const InputFields = {
    CardNumber: "card-number",
    CardExpiry: "card-expiry",
    CardCVC: "card-cvc"
}

export const CardIcons: {[id: string]: ReactElement } = {
    AMEX: <Amex />,
    DINERS: <Diners />,
    DISCOVER: <Discover />,
    GENERIC: <Generic />,
    HIPERCARD: <Hipercard />,
    JCB: <JCB />,
    MAESTROCARD: <Maestro />,
    MASTERCARD: <MasterCard />,
    UNIONPAY: <UnionPay />,
    VERVECARD: <VerveCard />,
    VISA: <VisaCard />,
}

interface CardProps {
    cardType: Card;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
    inputStyles?: object;
    loading: boolean
    onCardChange(event: React.ChangeEvent): void;
}

function CardField({cardType, onCardChange, inputStyles, cardNumber, cardExpiry, cardCVC, loading}: CardProps) {

    const [windowSize, setWindowSize] = useState(0);
    const [focus, setFocus] = useState(false);
    const contentString = useI18nContext();

    const handleFocusIn = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
    }

    const handleFocusOut = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
    }

    const handleResize = () => {
        const { innerWidth: width } = window;
        if (width >= 500) {
            setWindowSize(0);
        } else {
            setWindowSize(1);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* TODO: Place card field in an iFrame */}
            {windowSize? (
                <>
                    <div className={`input-container${focus? ' input-border': ''}`} >
                        <div className="input-icon">
                            {CardIcons[cardType.name]}
                        </div>
                        <span className="inline full-width"><input name={InputFields.CardNumber} className="card-input full-width" required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_card_number)} value={cardNumber} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut}  maxLength={20} style={{...inputStyles}} /></span>
                    </div>
                    <div className={`input-container my-8${focus? ' input-border': ''}`} >
                        <span className="inline"><input name={InputFields.CardExpiry} className="card-input full-width" required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_expiry)} value={cardExpiry} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut}  style={{...inputStyles}} /></span>
                        <span className="inline"><input name={InputFields.CardCVC} className="card-input full-width" maxLength={cardType.cvcMask?.length} required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_cvc)} value={cardCVC} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut}  style={{...inputStyles}} /></span>
                    </div>
                </>
            ): (
                <div className={`input-container${focus? ' input-border': ''}`} >
                    <div className="input-icon">
                        {CardIcons[cardType.name]}
                    </div>
                    <span className="inline full-width"><input name={InputFields.CardNumber} className="card-input full-width" required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_card_number)} value={cardNumber} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut} maxLength={20} style={{...inputStyles}} /></span>
                    <span className="inline"><input name={InputFields.CardExpiry} className="card-input full-width" required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_expiry)} value={cardExpiry} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut} style={{...inputStyles}} /></span>
                    <span className="inline"><input name={InputFields.CardCVC} className="card-input full-width" maxLength={cardType.cvcMask?.length} required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_cvc)} value={cardCVC} onChange={onCardChange} onFocus={handleFocusIn} onBlur={handleFocusOut} style={{width: 'calc(100% - 32px)', ...inputStyles}} /></span>
                </div>
            )}
        </>
    )
}

export default CardField;
