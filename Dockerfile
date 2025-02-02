FROM node:20.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 8443
CMD ["node", "bot.js"]
