
import Binance, { Binance as BinanceType, CandleChartInterval_LT } from 'binance-api-node'


class BinanceService {
    private client: BinanceType
    constructor() {
        this.client = Binance()
    }

    public async getPrices() {
        return this.client.futuresPrices()
    }

    private async getCandle(symbol: string, interval: CandleChartInterval_LT, limit: number) {
        return this.client.futuresCandles({ symbol: symbol, interval: interval, limit: limit })


    }
    public async getCandlesForBolingerBand(pairList: { symbol: string, interval: CandleChartInterval_LT, limit: number }[]) {
        let pendingPromises = []
        let candlesResult: { symbol: string; candles: string[] }[] = []
        for (const item of pairList) {
            const asyncPush = async () => {
                let candles = await this.getCandle(item.symbol, item.interval, item.limit)
                candlesResult.push({ symbol: item.symbol, candles: candles.map(item => item.close) })
            }
            pendingPromises.push(asyncPush())
        }

        await Promise.all(pendingPromises);
        return candlesResult
    }
}


export default new BinanceService()