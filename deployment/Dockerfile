FROM node:alpine

RUN apk update
RUN apk upgrade
RUN apk add docker
RUN rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

COPY daemon.json /etc/docker/
EXPOSE 9000

CMD ["/usr/src/app/entrypoint.sh"]

LABEL vf-OS=true
LABEL vf-OS-platform=true
