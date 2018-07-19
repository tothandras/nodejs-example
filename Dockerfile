ARG NODE_VERSION=10.6.0

###
# 1. Dependencies
###

# Install dependencies independently not to expose NPM_TOKEN in the build history
# https://docs.docker.com/engine/userguide/eng-image/multistage-build/
FROM node:${NODE_VERSION}-alpine as dependencies
WORKDIR /home/node/

RUN apk --no-cache add \
  g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --global npm

COPY package.json *package-lock.json ./
RUN npm install --global node-gyp
RUN npm ci

###
# 2. Application
###

FROM node:${NODE_VERSION}-alpine
WORKDIR /home/node/

COPY --from=dependencies node_modules node_modules
COPY . .

ENV NODE_ENV production
ENV PORT 3001
ENV METRICS_PORT 9999

ENV MONGODB_USERNAME ""
ENV MONGODB_PASSWORD ""
ENV MONGODB_URI ""

EXPOSE 3001 9999

CMD ["node", ".", "--use-strict"]
