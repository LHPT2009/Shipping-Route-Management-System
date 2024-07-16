FROM node:alpine3.20 as base-stage
WORKDIR /usr/app
COPY package.json ./
RUN npm install

FROM base-stage as build-stage
WORKDIR /usr/app
COPY . .