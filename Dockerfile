FROM  node:14.16.0-alpine3.13 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
RUN rm -R ./node_modules/bootstrap/js/src/util/index.js
COPY ./docker/index.js ./node_modules/bootstrap/js/src/util/
COPY . .
RUN npm run build

# production stage
FROM nginx:1.15.8-alpine as production-stage
COPY ./docker/prod.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf         
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
