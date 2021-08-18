import Config from "../config";
import { PaymentClientToken, PaymentTokenizationResponse } from "./PaymentToken";

async function post(path: string, clientToken: string, data = {}): Promise<PaymentTokenizationResponse> {
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
    return response.json();
}

function parseJwt(token: string): object {
    var payload64 = token.split('.')[1];
    var payload = Buffer.from(payload64, 'base64');
    return JSON.parse(payload.toString());
}

const PrimerFetch = {
    post
}

export default PrimerFetch;