// const Config: {[id: string]: any} = {
//     API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
//     SDK_BASE_URL: process.env.REACT_APP_SDK_BASE_URL,
//     MIXPANEL_TOKEN: process.env.REACT_APP_MIXPANEL_TOKEN,
// }
const Config: {[id: string]: any} = {
    API_BASE_URL: "https://api.staging.primer.io",
    SDK_BASE_URL: "https://sdk.api.staging.primer.io",
    MIXPANEL_TOKEN: "2c9ff37df8b5182d08cf2435a69bef9a",
}

export const CheckoutSDKPaths: {[id: string]: any} = {
    PAYMENT_INSTRUMENT: "/payment-instruments",
}

export default Config;