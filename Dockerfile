FROM node:24-alpine@sha256:51dbfc749ec3018c7d4bf8b9ee65299ff9a908e38918ce163b0acfcd5dd931d9

USER root

# Update packages as a result of Anchore security vulnerability checks
RUN apk update && \
    apk add --upgrade gnutls binutils nodejs nodejs-npm apk-tools libjpeg-turbo libcurl libx11 libxml2

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production --ignore-optional --ignore-scripts

CMD npm start
