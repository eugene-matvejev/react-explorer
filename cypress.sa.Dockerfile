FROM alpine AS sa

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm

COPY node-explorer/package.json node-explorer/package-lock.json ./

RUN npm i --verbose

COPY node-explorer/src ./src
COPY node-explorer/.babelrc ./.babelrc
COPY node-explorer/database ./database
COPY node-explorer/.sequelizerc ./.sequelizerc

RUN mkdir var
ENV DB_DIALECT=sqlite

RUN npm run sql db:migrate \
    && npm run sql db:seed:all

RUN npm run build

###################################################
## 'serve' image with encapsulated static assets ##
###################################################

FROM alpine

WORKDIR /www

COPY node-explorer/package.json node-explorer/package-lock.json ./

RUN apk add --no-cache nodejs nodejs-npm \
    && npm i --production \
    && apk del nodejs-npm

ENV DB_DIALECT=sqlite

COPY node-explorer/.env ./.env
COPY --from=sa /www/build /www/build
COPY --from=sa /www/var /www/var
