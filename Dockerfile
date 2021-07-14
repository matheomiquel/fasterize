#
# Build stage 0
#
FROM node:alpine as build-stage

# Setup dependencies
WORKDIR /app
COPY package*.json /app/
RUN npm install

# Copy build and run project
COPY ./ /app/
RUN npm run build

#
# Build stage 1
#
FROM node:alpine

# Environment variables
ARG DEPLOY_ENV
ENV NODE_ENV=$DEPLOY_ENV
ENV PORT=3000
RUN echo "DEPLOY_ENV value : $DEPLOY_ENV"
RUN echo "NODE_ENV value : $NODE_ENV"


WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY .env* /app/
COPY src /app/src
COPY package*.json /app/
COPY ormconfig.json /app/ormconfig.json
RUN npm install ts-node
RUN npm install
#CMD ls node_modules
CMD npm run start:dev
