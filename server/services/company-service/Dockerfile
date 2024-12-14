FROM node:22.9

WORKDIR /

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 2929

CMD ["npm", "run" , "dev"]
