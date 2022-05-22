FROM node:lts-alpine as development
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
COPY ["package.json", "package-lock.json*",  "./"]
RUN npm install glob rimraf typeorm ts-node tsconfig-paths
RUN npm install --only=development
COPY . .
RUN npm run build
