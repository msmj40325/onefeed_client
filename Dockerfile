# build stage
FROM node:16-alpine3.15 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VUE_APP_TWITTER_TOKEN=AAAAAAAAAAAAAAAAAAAAAEVvaAEAAAAAhluPly2R0UNBm4o8Ht%2FlN2wXPIQ%3DCQMMFMSOPNbSkhgy6EkU8iuaoVxhwylMylJ5vHhxjLzLfFzKIb VUE_APP_API_URI=http://localhost:1337

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM node:16-alpine3.15

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install

# # copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# # set environment variables
# ENV VUE_APP_TWITTER_TOKEN=AAAAAAAAAAAAAAAAAAAAAEVvaAEAAAAAhluPly2R0UNBm4o8Ht%2FlN2wXPIQ%3DCQMMFMSOPNbSkhgy6EkU8iuaoVxhwylMylJ5vHhxjLzLfFzKIb VUE_APP_API_URI=http://localhost:1337

# # build app for production with minification
# RUN npm run build

# EXPOSE 8080
# CMD [ "http-server", "dist" ]