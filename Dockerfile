FROM ubuntu:latest

ENV TZ=US

RUN apt-get update && \
    apt-get -y install tzdata && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install git -y && \
    apt-get install -y nodejs && \
    apt-get install -y ffmpeg && \
    apt-get autoremove -y

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

CMD [ "npm", "start" ]