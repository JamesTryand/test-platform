FROM node:alpine

RUN mkdir -p /usr/src/app/downloads
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .


EXPOSE 9000
CMD ["npm", "start"]

LABEL vf-OS=true
LABEL vf-OS-platform=true