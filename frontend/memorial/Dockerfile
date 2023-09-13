# 노드 이미지를 최신 버전으로 가져옴
FROM node:18

# working directory 지정
WORKDIR /app

COPY package* yarn.lock .pnp*     ./
COPY .yarnrc.yml                  ./
COPY .yarn                        ./.yarn

RUN yarn install --frozen-lockfile --immutable

# 앱 실행
CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "3000"]
