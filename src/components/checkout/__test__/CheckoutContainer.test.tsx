import React from 'react';
import { mount } from 'enzyme';
import CheckoutContainer, { PayButtonStyles, PaymentMethods } from '../CheckoutContainer';
import { BtnVariant } from '../../pay/PayButton';
import I18nProvider from '../../../i18n/I18nContext';
import { act } from 'react-dom/test-utils';
import { PaymentClientToken, PaymentTokenizationResponse } from '../../../helpers/PaymentToken';
import { parseJwt } from '../../../helpers/CheckoutFetch';

describe('<CheckoutContainer />', () => {
    const onTokenizationComplete = jest.fn();

    test('renders the checkout container with defaults', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn <strong>more here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
        <CheckoutContainer 
            lang={lang} 
            amount={amount} 
            currency={currency} 
            policy={policy} 
            btnStyles={btnStyles}
            allowPaymentMethods={allowPaymentMethods}
            clientToken={clientToken}
            onTokenizationComplete={onTokenizationComplete}
              />);  
        expect(component).toMatchSnapshot();
    });

    test('renders the checkout container with french language', () => {    
        const lang = "fr";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn <strong>more here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardNameInput: HTMLInputElement = component.find("input").first().getDOMNode();
        expect(cardNameInput.placeholder).toEqual("Nom du titulaire");
    });

    test('renders the checkout container with default language', () => {    
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn <strong>more here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider>
                <CheckoutContainer 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardNameInput: HTMLInputElement = component.find("input").first().getDOMNode();
        expect(cardNameInput.placeholder).toEqual("Cardholder Name");
    });

    test('renders the checkout container with the correct inputs', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardName = "John Doe";
        const cardNumber = "4111111111111111";
        const cardExpiry = "0332";
        const cardCVC = "345";

        const cardNameInput = component.find("input[name='card-name']");
        const cardNumberInput = component.find("input[name='card-number']").first();

        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        const cardCVCInput = component.find("input[name='card-cvc']").first();
        const payButton = component.find("button").first();
        cardNameInput.simulate('change', {target: { value: cardName, name: 'card-name'}});
        cardNumberInput.simulate('change', {target: { value: cardNumber, name: 'card-number'}});
        cardExpiryInput.simulate('change', {target: { value: cardExpiry, name: 'card-expiry'}});
        cardCVCInput.simulate('change', {target: { value: cardCVC, name: 'card-cvc'}});

        expect((cardNumberInput.getDOMNode() as HTMLInputElement).value).toEqual(`4111 1111 1111 1111`);
        expect((cardExpiryInput.getDOMNode() as HTMLInputElement).value).toEqual(`03 / 32`);
        expect((cardCVCInput.getDOMNode() as HTMLInputElement).value).toEqual(`345`);
        expect(payButton.text()).toEqual(`PAY ${currency}${amount}`);
    });

    test('renders the generic card type icon when card number does not match', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardNumber = "9999111111111118";
        const cardNumberInput = component.find("input[name='card-number']").first();
        cardNumberInput.simulate('change', {target: { value: cardNumber, name: 'card-number'}});
        const cardNumberIcon = component.find("svg[id='generic']").first();
        expect(cardNumberIcon).toBeTruthy();
    });

    test('renders the generic card type icon without errors when card number is not complete', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardName = "John Doe";
        const cardNumber = "9999111111";
        const cardExpiry = "0332";
        const cardCVC = "345";

        const cardNameInput = component.find("input[name='card-name']");
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        const cardCVCInput = component.find("input[name='card-cvc']").first();
        const cardNumberInput = component.find("input[name='card-number']").first();
        cardNumberInput.simulate('change', {target: { value: cardNumber, name: 'card-number'}});

        cardNameInput.simulate('change', {target: {value: cardName, name: 'card-name'}});
        cardNumberInput.simulate('change', {target: {value: cardNumber, name: 'card-number'}});
        cardExpiryInput.simulate('change', {target: {value: cardExpiry, name: 'card-expiry'}});
        cardCVCInput.simulate('change', {target: {value: cardCVC, name: 'card-cvc'}});

        const helperError = component.find("span[id='helper-container']").first();
        expect(helperError.text()).toBeFalsy();
    });

    test('renders less or equal to two digits of the card expiry characters correctly', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  


        const cardExpiry = "03";
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        cardExpiryInput.simulate('change', {target: {value: cardExpiry, name: 'card-expiry'}});
        expect((cardExpiryInput.getDOMNode() as HTMLInputElement).value).toEqual(cardExpiry);
    });

    test('renders greater than 2 digits of the card expiry characters correctly', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  


        const cardExpiry = "032";
        const cardExpected = "03 / 2";
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        cardExpiryInput.simulate('change', {target: {value: cardExpiry, name: 'card-expiry'}});
        expect((cardExpiryInput.getDOMNode() as HTMLInputElement).value).toEqual(cardExpected);
    });

    test('renders greater than or equal to 4 digits of the card expiry characters correctly', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  


        const cardExpiry = "1222";
        const cardExpected = "12 / 22";
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        cardExpiryInput.simulate('change', {target: {value: cardExpiry, name: 'card-expiry'}});
        expect((cardExpiryInput.getDOMNode() as HTMLInputElement).value).toEqual(cardExpected);
    });

    test('renders some errors due expired card', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  


        const cardExpiry = "1220";
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        cardExpiryInput.simulate('change', {target: {value: cardExpiry, name: 'card-expiry'}});
        const helperDiv = component.find("span[id='helper-container']");
        expect(helperDiv.text()).toEqual("Please provide a valid expiry date");
    });

    test('renders the CVC correctly', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardCVC = "123";
        const cardCVCInput = component.find("input[name='card-cvc']").first();
        cardCVCInput.simulate('change', {target: { value: cardCVC, name: 'card-cvc'}});
        expect((cardCVCInput.getDOMNode() as HTMLInputElement).value).toEqual(cardCVC);
    });

    test('renders an error on wrong CVC provided for card type', () => {    
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardNumber = "378282246310005";
        const cardCVC = "123";
        const cardExpiry = "12/22";
        const cardNumberInput = component.find("input[name='card-number']").first();
        const cardExpiryInput = component.find("input[name='card-expiry']").first();
        const cardCVCInput = component.find("input[name='card-cvc']").first();
        cardNumberInput.simulate('change', {target: { value: cardNumber, name: 'card-number'}});
        cardExpiryInput.simulate('change', {target: { value: cardExpiry, name: 'card-expiry'}});
        cardCVCInput.simulate('change', {target: { value: cardCVC, name: 'card-cvc'}});
        const helperDiv = component.find("span[id='helper-container']");
        expect(helperDiv.text()).toEqual("Please provide a valid CVC number");
    });

    test('renders an error when the card holder name is not full', () => {  
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];
        const clientToken = "iahd8ajnoilej129uoi31290jmsouh3ikqda9oj23qmwaswaislk";

        const component = mount(
            <I18nProvider lang={lang}>
                <CheckoutContainer 
                    lang={lang} 
                    amount={amount} 
                    currency={currency} 
                    policy={policy} 
                    btnStyles={btnStyles}
                    allowPaymentMethods={allowPaymentMethods}
                    clientToken={clientToken}
                    onTokenizationComplete={onTokenizationComplete} />
            </I18nProvider>
        );  

        const cardName = "Abdul";
        const cardNameInput = component.find("input[name='card-name']").first();
        cardNameInput.simulate('change', {target: { value: cardName, name: 'card-name'}});
        const helperDiv = component.find("span[id='helper-container']");
        expect(helperDiv.text()).toEqual("Please enter a valid card holder name");
    });

    beforeEach(() => {
        global.fetch = jest.fn();
    })


    test('Calls onTokenizationComplete when pay button is clicked and loading complete', () => {
        const clientToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const lang = "en";
        const amount = 500;
        const currency = "$";
        const policy = <>Hello there, terms of service applies. Learn more <strong>here</strong></>;
        const btnStyles: PayButtonStyles = {logoSrc: '/logo192.png', btnVariant: BtnVariant.large};
        const allowPaymentMethods = [PaymentMethods.Card];

        act( () => {
            const component = mount(
                <I18nProvider lang={lang}>
                    <CheckoutContainer 
                        lang={lang} 
                        amount={amount} 
                        currency={currency} 
                        policy={policy} 
                        btnStyles={btnStyles}
                        allowPaymentMethods={allowPaymentMethods}
                        clientToken={clientToken}
                        onTokenizationComplete={onTokenizationComplete} />
                </I18nProvider>);  
    
            const cardName = "John Doe";
            const cardNumber = "4111111111111111";
            const cardExpiry = "0332";
            const cardCVC = "345";
    
            const cardNameInput = component.find("input[name='card-name']");
            const cardNumberInput = component.find("input[name='card-number']").first();
    
            const cardExpiryInput = component.find("input[name='card-expiry']").first();
            const cardCVCInput = component.find("input[name='card-cvc']").first();
            cardNameInput.simulate('change', {target: { value: cardName, name: 'card-name'}});
            cardNumberInput.simulate('change', {target: { value: cardNumber, name: 'card-number'}});
            cardExpiryInput.simulate('change', {target: { value: cardExpiry, name: 'card-expiry'}});
            cardCVCInput.simulate('change', {target: { value: cardCVC, name: 'card-cvc'}});
            
            const form = component.find('form').first();
            form.simulate('submit');
    
            expect(onTokenizationComplete).toHaveBeenCalledTimes(1);
        })
    });
});