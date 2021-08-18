import { Card, CardTypes } from './CardTypes';

/**
 * Strip all input characters that are not within the range of 0-9
 * @param string The alphanumeric 
 * @returns {string}
 */
export function numbersOnlyString (string: string): string {
  var numbersOnlyString = "";
  for(var i = 0; i < string.length; i++) {
    var currentChar = string.charAt(i);
    var isValid = !isNaN(parseInt(currentChar));
    if(isValid) { numbersOnlyString += currentChar; }
  }
  return numbersOnlyString;
};


/**
 * Apply a format mask to the string
 * @param string The string to be masked
 * @param mask The mask to be used
 * @returns {string} The string with the mask applied
 */
export function applyFormatMask (string: string, mask?: string): string {
  var formattedString = "";
  var numberPos = 0;
  if (!mask) return string;
  for(var j = 0; j < mask.length; j++) {
    var currentMaskChar = mask[j];
    if(currentMaskChar === "X") {
      var digit = string.charAt(numberPos);
      if(!digit) {
        break;
      }
      formattedString += string.charAt(numberPos);
      numberPos++;
    } else {
      formattedString += currentMaskChar;
    }
  }
  return formattedString;
};


/**
 * Establish the type of a card from the number.
 * @param number The card number
 * @returns {Card|null} The card type as string or undefined if not exist
 */
export function whatCardType (number: string): Card | undefined {
  let re: RegExp;
  // Diners
  re = new RegExp(CardTypes.DINERS.pattern);
  if (number.match(re) != null)
    return CardTypes.DINERS;

  // JCB
  re = new RegExp(CardTypes.JCB.pattern);
  if (number.match(re) != null)
    return CardTypes.JCB;

  // AMEX
  re = new RegExp(CardTypes.AMEX.pattern);
  if (number.match(re) != null)
    return CardTypes.AMEX;

  // Visa
  re = new RegExp(CardTypes.VISA.pattern);
  if (number.match(re) != null)
    return CardTypes.VISA;

  // Mastercard
  re = new RegExp(CardTypes.MASTERCARD.pattern);
  if (number.match(re) != null)
    return CardTypes.MASTERCARD;

  // Discover
  re = new RegExp(CardTypes.DISCOVER.pattern);
  if (number.match(re) != null)
    return CardTypes.DISCOVER;

  //Hipercard
  re = new RegExp(CardTypes.HIPERCARD.pattern);
  if (number.match(re) != null)
    return CardTypes.HIPERCARD;

  //UnionPay
  re = new RegExp(CardTypes.UNIONPAY.pattern);
  if (number.match(re) != null)
    return CardTypes.UNIONPAY;

  //Maestro Card
  re = new RegExp(CardTypes.MAESTROCARD.pattern);
  if (number.match(re) != null)
    return CardTypes.MAESTROCARD;

  //Verve Card
  re = new RegExp(CardTypes.VERVECARD.pattern);
  if (number.match(re) != null)
    return CardTypes.VERVECARD;

  return undefined;
};

/**
 * Checks whether the given card expiry (month and year) is valid?
 * @param month The expiry month on the card
 * @param year The expiry year on the card
 * @returns {boolean} True if expiry is valid, false otherwise
 */
 export function isExpiryValid(month: string, year: string): boolean {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = String(today.getFullYear());
  const yearLong = currentYear.substring(0, 2) + year;

  const currentYearNum = parseInt(currentYear);
  const monthNum = parseInt(month);
  const yearNum = parseInt(yearLong);

  return (isValidMonth(monthNum) && (yearNum > currentYearNum)) || (yearNum === currentYearNum && monthNum >= currentMonth);
};


/**
 * Checks whether the given month is valid?
 * @param expiryMonth The expiry month on the card
 * @returns {boolean} True if expiry is valid, false otherwise
 */
 function isValidMonth (expiryMonth: number): boolean {
  return (expiryMonth >= 1 && expiryMonth <= 12);
};

/**
 * Checks whether the CVC of the card is valid
 * @return True if the cvc is valid, false otherwise
 */
export function isCVCValid (cvc: string, cardType?: Card): boolean {
    if (!cvc || !cardType) return false;
    const cvcValue = cvc.trim();
    return (cvcValue.length >= cardType.cvcMask.length) && Number(cvcValue) > 0;
}

export function buildPaymentInstrument(cardNumber: string, cardCVC: string, cardExpiry: string, cardName: string){
  return {
    paymentInstrument: {
      number: numbersOnlyString(cardNumber),
      cvv: cardCVC,
      expirationMonth: cardExpiry.split("/")[0].trim(),
      expirationYear: String(new Date().getFullYear()).substring(0, 2) + cardExpiry.split("/")[1].trim(),
      cardholderName: cardName
    }
  }
}