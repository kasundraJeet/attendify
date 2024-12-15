FROM node:22

WORKDIR /

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5050

CMD ["npm", "run", "preview"]
