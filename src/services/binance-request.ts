
import qs from 'qs';
import NodeRsa from 'node-rsa';


interface GeneralResponse {
    code: string;
}

class BinanceService {

    private keyPair: NodeRsa;

    constructor() {
        this.keyPair = new NodeRsa(Buffer.from(this.privateKey, 'base64'), 'pkcs8-private-der');
    }

    private async sendRequest<T extends GeneralResponse>(options: {
        url: string;
        method: 'GET' | 'POST';
        query?: { [key: string]: any };
        body?: { [key: string]: any };
    }) {
        options.query = options.query ? options.query : {};
        options.query.timestamp = Date.now();

        const stringToSign = this.getStringToSign({
            body: options.body,
            query: options.query,
        });

        const signature = await this.sign(stringToSign);

        try {
            const { data: result } = await axios.request<T>({
                url: `${this.getBaseUrl()}${options.url}?${qs.stringify(options.query)}`,
                method: options.method,
                ...(options.body && {
                    data: options.body,
                }),
                headers: {
                    'x-api-signature': signature,
                    merchantCode: this.merchantCode,
                    timestamp: options.query.timestamp,
                },
                timeout: 5000,
            });

            if (result.code != '000000000') {
                this.errorHandler(result.code);
            }

            return result;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                this.errorHandler(error.code || 'DEFAULT_ERROR');
            }
        }
    }

    private getStringToSign(options: { body?: { [key: string]: any }; query?: { [key: string]: any } }) {
        let stringToSign = '';

        if (options.body) {
            const stringifyBody = JSON.stringify(options.body);
            stringToSign += stringifyBody;
        }
        if (options.query) {
            const stringifyQuery = qs.stringify(options.query);
            stringToSign += `${options.body ? '&' : ''}${stringifyQuery}`;
        }

        return stringToSign;
    }

    private sign(container: string): Promise<string> {
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                try {
                    const encryptedData = this.keyPair.sign(container, 'base64');
                    resolve(encryptedData);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}

export default new BinanceService()