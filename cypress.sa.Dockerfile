FROM alpine AS sa

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm

COPY node-explorer/package.json node-explorer/package-lock.json ./

RUN npm i --verbose

COPY node-explorer/.sequelizerc ./.sequelizerc
COPY node-explorer/.babelrc ./.babelrc
COPY node-explorer/.env ./.env
COPY node-explorer/database ./database
COPY node-explorer/src ./src

RUN mkdir var
ENV DB_DIALECT=sqlite

RUN npm run sql db:migrate \
    && npm run sql db:seed:all

RUN npm run build
