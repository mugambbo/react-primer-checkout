import * as CardHelper from '../CardHelper';
import { CardTypes } from "../CardTypes";

describe('CardHelper: numbersOnlyString', () => {
    it('Returns numbers i.e. 0-9 only from a text', () => {
         const text = "12321hgb213781290-21p30212";
         const numbers = CardHelper.numbersOnlyString(text);
         const expectedNumbers = "123212137812902130212";
         expect(numbers).toEqual(expectedNumbers);
    });
});

describe('CardHelper: applyFormatMask', () => {
    it('Returns credit card numbers using the format mask specified', () => {
        const numbers = "4111111111111111";
        const mask = "XXXX XXXX XXXX XXXX";
        const actualMaskedNumbers = CardHelper.applyFormatMask(numbers, mask);
        const expectedMaskedNumbers = "4111 1111 1111 1111";
        expect(actualMaskedNumbers).toEqual(expectedMaskedNumbers);
    });

    it('Returns the credit card numbers as-is when no mask is specified', () => {
        const numbers = "4111111111111111";
        const actualMaskedNumbers = CardHelper.applyFormatMask(numbers);
        const expectedMaskedNumbers = "4111111111111111";
        expect(actualMaskedNumbers).toEqual(expectedMaskedNumbers);       
    });

    it('Returns only a part of the credit card numbers when one character is empty', () => {
        const numbers = "4111111111111111";
        const actualMaskedNumbers = CardHelper.applyFormatMask(numbers, CardTypes.MASTERCARD.mask);
        const expectedMaskedNumbers = "4111 1111 1111 1111";
        expect(actualMaskedNumbers).toEqual(expectedMaskedNumbers);
    });
})

describe('CardHelper: whatCardType', () => {
    it('Returns the correct card type based on the pattern specified: Diners', () => {
        const numbers = "30569309025904";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.DINERS;
        expect(actualCardType).toEqual(expectedCardType);
    });

    it('Returns the correct card type based on the pattern specified: JCB', () => {
        const numbers = "3530111333300000";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.JCB;
        expect(actualCardType).toEqual(expectedCardType);
    });    
    
    it('Returns the correct card type based on the pattern specified: American Express', () => {
        const numbers = "378282246310005";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.AMEX;
        expect(actualCardType).toEqual(expectedCardType);
    });    
    
    it('Returns the correct card type based on the pattern specified: Visa', () => {
        const numbers = "4012888888881881";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.VISA;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: MasterCard', () => {
        const numbers = "5105105105105100";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.MASTERCARD;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: Discover', () => {
        const numbers = "6011111111111117";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.DISCOVER;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: Hipercard', () => {
        const numbers = "6062826786276634";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.HIPERCARD;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: UnionPay', () => {
        const numbers = "6250941006528599";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.UNIONPAY;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: Maestro', () => {
        const numbers = "6759649826438453";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.MAESTROCARD;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns the correct card type based on the pattern specified: Verve', () => {
        const numbers = "5061460410120223210";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = CardTypes.VERVECARD;
        expect(actualCardType).toEqual(expectedCardType);
    });
    
    it('Returns undefined when credit card number does not match a card', () => {
        const numbers = "9961460410120223210";
        const actualCardType = CardHelper.whatCardType(numbers);
        const expectedCardType = undefined;
        expect(actualCardType).toEqual(expectedCardType);
    });
});

describe('isExpiryValid', () => {
    it('Returns true when the corret expiry date is passed', () => {
        const date = new Date();
        const nextThreeMonths = date.getDate() + 90; //Add 90 days
        date.setDate(nextThreeMonths);
        const month = String(date.getMonth() + 1);
        const fullyear = String(date.getFullYear());
        const year = fullyear.substring(fullyear.length - 2);
        const isExpiryValidActual = CardHelper.isExpiryValid(month, year);
        expect(isExpiryValidActual).toEqual(true);
    });

    it('Returns false when an older expiry date is passed', () => {
        const date = new Date();
        const nextThreeMonths = date.getDate() - 90; //Add 90 days
        date.setDate(nextThreeMonths);
        const month = String(date.getMonth() + 1);
        const fullyear = String(date.getFullYear());
        const year = fullyear.substring(fullyear.length - 2);
        const isExpiryValidActual = CardHelper.isExpiryValid(month, year);
        expect(isExpiryValidActual).toEqual(false);
    });

    it('Returns true when the expiry date falls on this month', () => {
        const date = new Date();
        const nextThreeMonths = date.getDate(); //Add 90 days
        date.setDate(nextThreeMonths);
        const month = String(date.getMonth() + 1);
        const fullyear = String(date.getFullYear());
        const year = fullyear.substring(fullyear.length - 2);
        const isExpiryValidActual = CardHelper.isExpiryValid(month, year);
        expect(isExpiryValidActual).toEqual(true);
    });
})

describe('isCVCValid', () => {
    it('Returns false when the card type is not known', () => {
        const cvc = "123";
        const isCVCValid = CardHelper.isCVCValid(cvc);
        expect(isCVCValid).toEqual(false);
    })

    it('Returns true when the card type is not known', () => {
        const cvc = "123";
        const cardType = CardTypes.MASTERCARD;
        const isCVCValid = CardHelper.isCVCValid(cvc, cardType);
        expect(isCVCValid).toEqual(true);
    })
})

describe('buildPaymentInstrument', () => {
    it('Return the payment instrument as an object', () => {
        const cardNumber = "4111 1111 1111 1111";
        const cardNumbersOnly = "4111111111111111";
        const cardCVC = "123";
        const cardExpiry = "03 / 22";
        const cardExpiryYear = String(new Date().getFullYear()).substring(0, 2);
        const cardName = "John Doe";
        const paymentInstrument = CardHelper.buildPaymentInstrument(cardNumber, cardCVC, cardExpiry, cardName);
        expect(paymentInstrument).toEqual({
            paymentInstrument: {
                number: cardNumbersOnly,
                cvv: cardCVC,
                expirationMonth: "03",
                expirationYear: cardExpiryYear + 22,
                cardholderName: cardName
            }
        });
    });
})