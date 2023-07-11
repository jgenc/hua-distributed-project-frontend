# rootless podman Port 80 binding
# https://www.redhat.com/sysadmin/podman-nginx-multidomain-applications
# 
# Just for testing, run:
#   - sudo sysctl net.ipv4.ip_unprivileged_port_start=80
# and after being done RUN THE FOLLOWING:
#   - sudo sysctl net.ipv4.ip_unprivileged_port_start=1024
FROM nginx:stable-alpine3.17-slim

WORKDIR /app

RUN apk update && apk add \
  npm

COPY ./vite.config.js ./package*.json /app/
COPY ./src /app/src
RUN ["npm",  "install", "--legacy-peer-deps"]

COPY . .
RUN npm run build

RUN rm -rf /usr/share/nginx/html/*
RUN mv dist/* /usr/share/nginx/html
# TODO: Fix the goddamn nginx conf file
# COPY ./assets/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
