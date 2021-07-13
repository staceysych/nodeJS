FROM node:12.18-alpine
ENV NODE_ENV=production
FROM node:14

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
