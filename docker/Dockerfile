FROM node:21 AS base
WORKDIR /usr/src/app
COPY client/package*.json ./

FROM base AS dependencies
RUN npm i
FROM dependencies AS build
COPY client/. .
RUN npm run build

FROM node:21-alpine AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]