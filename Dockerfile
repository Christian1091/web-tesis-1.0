FROM node:10.16.3 as build-stage
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.15
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf