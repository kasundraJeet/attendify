FROM node:22

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 2929

CMD ["npm", "run" , "dev"]
