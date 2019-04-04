FROM node:8

USER node

WORKDIR /home/node

COPY package*.json ./

RUN npm i --production

COPY . .

CMD ["npm", "start"]
