export interface Card {
    name: string;
    pattern: string;
    mask: string;
    cvcMask: string;
}
  
interface CardType {
  DINERS: Card;
  JCB: Card;
  AMEX: Card;
  VISA: Card;
  MASTERCARD: Card;
  DISCOVER: Card;
  HIPERCARD: Card;
  UNIONPAY: Card;
  MAESTROCARD: Card;
  VERVECARD: Card;
  GENERIC: Card;
}
  
export const CardTypes: CardType = {
  DINERS: {
    name: "DINERS",
    pattern: "^3(?:0[0-59]{1}|[689])[0-9]{0,}$",
    mask: "XXXX XXXX XXXX XX",
    cvcMask: "XXX",
  },
  JCB: {
    name: "JCB",
    pattern: "^(?:2131|1800|35)[0-9]{0,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  AMEX: {
    name: "AMEX",
    pattern: "^3[47][0-9]{0,}$",
    mask: "XXXX XXXXXX XXXXX",
    cvcMask: "XXXX",
  },
  VISA: {
    name: "VISA",
    pattern: "^4[0-9]{6,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  MASTERCARD: {
    name: "MASTERCARD",
    pattern: "^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },  
  DISCOVER: {
    name: "DISCOVER",
    pattern: "^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  HIPERCARD: {
    name: "HIPERCARD",
    pattern: "^(606282|3841)[0-9]{5,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  UNIONPAY: {
    name: "UNIONPAY",
    pattern: "^(62|88)[0-9]{5,}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  MAESTROCARD: {
    name: "MAESTROCARD",
    pattern: "^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  },
  VERVECARD: {
    name: "VERVECARD",
    pattern: "^((506(0|1))|(507(8|9))|(6500))[0-9]{12,15}$",
    mask: "XXXX XXXX XXXX XXXX XXX",
    cvcMask: "XXX",
  },
  GENERIC: {
    name: "GENERIC",
    pattern: "",
    mask: "XXXX XXXX XXXX XXXX",
    cvcMask: "XXX",
  }
}