FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV MONGO_URI=mongodb://localhost:27017/attendify_company

ENV JWT_SECRET=jeetxmurli

ENV RABBITMQ_URI=amqp://localhost

EXPOSE 2929

CMD ["npm", "run" , "dev"]
