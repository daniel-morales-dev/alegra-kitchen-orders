FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
WORKDIR ./dist

EXPOSE 4041

CMD [ "node", "index.js" ]