FROM node:20.10.0 as builder

WORKDIR /api

ADD package.json /api

RUN npm install

COPY . /api

RUN useradd -ms /bin/bash server

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN chmod -R 777 /api

USER server

RUN npm run build

CMD ["npm", "start"]