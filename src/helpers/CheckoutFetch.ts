import Config from "../config";
import { PaymentClientToken } from "./PaymentToken";

async function post(path: string, clientToken: string, data = {}): Promise<any> {
    const url = `${Config.SDK_BASE_URL}${path}`;
    const accessTokenRes: PaymentClientToken = parseJwt(clientToken) as PaymentClientToken;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Primer-Client-Token': accessTokenRes.accessToken
        },
        body: JSON.stringify(data)
    });

    // check for error response
    if (!response.ok) {
        const dataRes: {[key: string]: any}  = response.json();
        //Get error message from body or default to response statusText
        const error = (dataRes && dataRes.message) || response.statusText;
        throw new Error(error);
    }

    return response.json();
}

export function parseJwt(token: string): object {
    var payload64 = token.split('.')[1];
    var payload = Buffer.from(payload64, 'base64');
    return JSON.parse(payload.toString());
}

const PrimerFetch = {
    post
}

export default PrimerFetch;