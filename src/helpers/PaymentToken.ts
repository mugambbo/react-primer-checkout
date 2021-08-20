export interface PaymentClientToken {
    accessToken: string;
    intent: string;
    env: string;
}

export interface PaymentAPIToken {
    clientToken: string;
    expirationDate: string;
}

export interface PaymentTokenizationResponse {
    deleted: boolean; //true or false
    createdAt: string; //"2021-05-04T09:33:52.293855",
    updatedAt: string; //"2021-05-04T09:33:52.293855",
    deletedAt: null;
    token: string; //"alooYT5lS4m2JdL60rNo9nwxNjIwMTIwODMy",
    analyticsId: string; //"-NxZbWYcXPiRMynOCdzu2G5L",
    tokenType: string; //"SINGLE_USE",
    paymentInstrumentType: string; //"PAYMENT_CARD",
    paymentInstrumentData:{
       last4Digits: string; //"1111",
       expirationMonth: string; //"03",
       expirationYear: string; //"2030",
       cardholderName: string; //"J Doe",
       network: string; //"Visa",
       isNetworkTokenized: boolean; //false,
       binData:{
          network: string; //"VISA",
          issuerCountryCode: string; //"US",
          issuerName: string; //"JPMORGAN CHASE BANK, N.A.",
          issuerCurrencyCode: string; //null,
          regionalRestriction: string; //"UNKNOWN",
          accountNumberType: string; //"UNKNOWN",
          accountFundingType: string; //"UNKNOWN",
          prepaidReloadableIndicator: string; //"NOT_APPLICABLE",
          productUsageType: string; //"UNKNOWN",
          productCode: string; //"VISA",
          productName: string; //"VISA"
       }
    },
    vaultData: any; //null,
    threeDSecureAuthentication: any; //null    
}