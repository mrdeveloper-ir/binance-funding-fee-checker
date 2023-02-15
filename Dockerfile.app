FROM node:18.14.0-alpine3.17

RUN apk update
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

COPY . .

CMD ["dumb-init", "node", "build/index.js"]