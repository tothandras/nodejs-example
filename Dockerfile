FROM node:8.9.4

COPY package.json package.json
RUN npm install

# Add your source files
COPY . .

ENV NODE_ENV production
ENV PORT 3001
ENV METRICS_PORT 9999

ENV MONGODB_USERNAME ""
ENV MONGODB_PASSWORD ""
ENV MONGO_URI "mongodb://127.0.0.1/nodejs-example"

EXPOSE 3001 9999

CMD ["node", "server", "--use-strict"]