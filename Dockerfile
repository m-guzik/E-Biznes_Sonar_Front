FROM node:22-alpine3.19

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
