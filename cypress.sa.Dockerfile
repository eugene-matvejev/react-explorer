FROM alpine AS sa

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm

COPY node-explorer/package.json node-explorer/package-lock.json ./

RUN npm i --verbose

COPY node-explorer/src ./src
COPY node-explorer/.babelrc ./.babelrc

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

COPY node-explorer/.env ./.env
COPY --from=sa /www/build /www/build
