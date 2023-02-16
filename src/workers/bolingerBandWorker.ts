
import { config as dotEnvConfig } from 'dotenv';
import sendNormalRequest from '../services/binance'

dotEnvConfig();

const getBinanceFuturesPairs = async () => {

}

class BolingerBandWorker {
    public async start() {

    }
}

const worker = new BolingerBandWorker();

async function main() {
    try {
        await worker.start();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

main();
