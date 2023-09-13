FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package* yarn.lock .pnp*     ./
COPY .yarnrc.yml                  ./
COPY .yarn                        ./.yarn

RUN yarn cache clean \
    && yarn install --frozen-lockfile

COPY . .

yarn build

FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

EXPOSE 3000

COPY package.json .
COPY vite.config.ts .

RUN yarn install typescript

EXPOSE 3000

CMD ["yarn", "preview"]
