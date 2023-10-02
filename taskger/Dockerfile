FROM node:18-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "db:migrate", "&", "npm", "run", "db:client:generate", "&", "npm", "run", "start:prod"]