FROM node:9.9.0-alpine

COPY . /app
WORKDIR /app
RUN yarn install

CMD yarn run start
