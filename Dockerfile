
FROM nginx
ENV NGINX_PORT=443
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/
COPY ./dist/intranet .
EXPOSE 8234