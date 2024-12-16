FROM node:22

WORKDIR /

COPY package.json package-lock.json ./

RUN npm i

COPY . .


CMD ["npm", "run" , "dev"]
