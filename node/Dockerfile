FROM node:0.12.7

RUN apt-get update && apt-get install -y \
    libkrb5-dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 8000