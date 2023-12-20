FROM node:18
WORKDIR /app
COPY docker /app
RUN npm install
