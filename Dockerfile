FROM node:lts-alpine as development
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*",  "./"]
RUN npm install glob rimraf typeorm ts-node tsconfig-paths
RUN npm install
COPY . .
RUN npm run build
