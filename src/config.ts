const Config: {[id: string]: any} = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    SDK_BASE_URL: process.env.REACT_APP_SDK_BASE_URL,
    MIXPANEL_TOKEN: process.env.REACT_APP_MIXPANEL_TOKEN,
}

export const CheckoutSDKPaths: {[id: string]: any} = {
    PAYMENT_INSTRUMENT: "/payment-instruments",
}

export default Config;