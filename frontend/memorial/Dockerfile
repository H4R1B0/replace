FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn cache clean
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "preview" ]
