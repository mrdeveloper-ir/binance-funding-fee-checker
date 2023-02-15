
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

class FundingFeeWorker {
    public async CheckFundingFees() {

    }
}

const worker = new FundingFeeWorker();

async function main() {
    try {
        await worker.CheckFundingFees();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

main();
