FROM node:22

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run" , "dev"]
