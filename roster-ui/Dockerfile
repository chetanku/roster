FROM node:latest as build-stage
RUN apt -y update && apt install -y vim
WORKDIR /app
COPY package*.json default.conf /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1
FROM nginx:latest
#ARG password
#ARG username
#RUN htpasswd -c -b /etc/nginx/.htpasswd ${username} ${password} 
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
RUN apt -y update && apt install -y apache2-utils

RUN service nginx restart
