FROM node:20.10.0 as builder

WORKDIR /web

ADD package.json /web

RUN npm install

COPY . /web

RUN npm run build

CMD ["npm", "run", "preview"]