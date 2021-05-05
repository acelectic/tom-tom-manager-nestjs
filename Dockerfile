FROM node:12.18.3-alpine3.12
ARG APP_ENV
WORKDIR /app
RUN mkdir logs
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
