FROM docker-nexus.sfera.org/nginx-120:1-38
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 8000
ENTRYPOINT [ "nginx","-g","daemon off;" ]