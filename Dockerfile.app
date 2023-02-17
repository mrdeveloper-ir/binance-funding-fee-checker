FROM node:18.14.0-alpine3.16
RUN apk update
RUN apk add dumb-init python3 make gcc node-gyp
WORKDIR /app
COPY package*.json .
RUN npm install -g node-pre-gyp
RUN npm install
COPY . .
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
CMD ["dumb-init", "node", "build/index.js"]