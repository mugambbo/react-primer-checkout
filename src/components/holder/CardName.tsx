import React, { useState } from 'react'
import I18nHelper from '../../helpers/I18nHelper';
import { useI18nContext } from '../../i18n/I18nContext'
import { UserIcon } from '../svg';

interface CardNameProps {
    cardName: string;
    inputStyles?: object;
    loading: boolean;
    onCardNameChange(event: React.ChangeEvent): void
}

function CardName({loading, cardName, inputStyles, onCardNameChange}: CardNameProps) {
    const contentString = useI18nContext();
    const [focus, setFocus] = useState(false);

    const handleFocusIn = (_: React.FocusEvent) => {
        setFocus(true);
    }

    const handleFocusOut = (_: React.FocusEvent) => {
        setFocus(false);
    }

    return (
        <div id="card-name" className={`input-container my-8${focus? " input-border": ""}`} >
            <div className="input-icon">
                <UserIcon />
            </div>
            <input name="card-name" className="card-input full-width" required disabled={loading} placeholder={I18nHelper.formatString(contentString.placeholder_cardholder_name)} value={cardName} onFocus={handleFocusIn} onBlur={handleFocusOut} style={{...inputStyles}} onChange={onCardNameChange} />
        </div>
    )
}

export default CardName
