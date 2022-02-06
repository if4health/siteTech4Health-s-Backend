FROM node:latest
# RUN mkdir /app

LABEL AUTHOR="André Luís Del Mestre Martins <andremartins@ifsul.edu.br>"
LABEL MAINTAINER="André Luís Del Mestre Martins <andremartins@ifsul.edu.br>"

WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install
COPY . /usr/src/app

EXPOSE ${SERVER_PORT}
CMD ["npm", "run", "start"]