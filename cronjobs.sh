#!/bin/sh
echo '* * * * * node /app/build/workers/fundingFeeWorker.js' > /etc/crontabs/root
echo '* * * * * node /app/build/workers/bolingerBandWorker.js' >> /etc/crontabs/root
echo '' >> /etc/crontabs/root