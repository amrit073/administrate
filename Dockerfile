FROM node:12-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN apk update && apk upgrade
RUN apk add --no-cache sqlite
RUN npm install sqlite3
RUN npm install
COPY . .
CMD ["node" , "src/index.js"]
