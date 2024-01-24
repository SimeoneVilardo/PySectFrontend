# ---- Base Node ----
FROM node:21 AS base
WORKDIR /usr/src/app
COPY client/package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm i

# ---- Copy Files/Build ----
FROM dependencies AS build
COPY client/. .
RUN npm run build

# ---- Release ----
FROM node:21-alpine AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]