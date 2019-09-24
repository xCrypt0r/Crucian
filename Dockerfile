FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y npm && \
    apt-get install -y ffmpeg && \
    apt-get autoremove -y

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

CMD [ "npm", "start" ]