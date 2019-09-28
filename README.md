# Crucian
![Language](https://img.shields.io/badge/Language-Node.js-red)
[![MIT License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/SoBusted/Crucian/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/SoBusted/Crucian.svg?branch=master)](https://travis-ci.org/SoBusted/Crucian)

**Crucian** is my discord bot with simple structure based on [discord.js](https://github.com/discordjs/discord.js)
-   Made by SoBusted

## How to run
### Local set up
#### For Linux
1.  Run `git clone https://github.com/SoBusted/Crucian.git` to clone this repository

1.  Run `sudo apt-get install nodejs npm` to install [node.js](https://nodejs.org) and [npm](https://www.npmjs.com)

1.  Run `npm install` to install all dependencies listed in [package.json](https://github.com/SoBusted/Crucian/blob/master/package.json#L21)

1.  Run `sudo apt-get install ffmpeg` to install [ffmpeg](https://www.ffmpeg.org) (for music bot features)

1.  Run `npm start` or `node bot.js` to start bot

### Docker set up
#### For Linux
1.  Run `git clone https://github.com/SoBusted/Crucian.git` to clone this repository

1.  Run `sudo apt install docker.io` to install [docker](https://www.docker.com)

1.  Run `sudo systemctl start docker && sudo systemctl enable docker` to start docker and run automatically at startup

1.  Run `sudo docker build -t crucian .` to make docker image with [Dockerfile](https://github.com/SoBusted/Crucian/blob/master/Dockerfile)  
This takes about 5-10 minutes, so be patient

1.  Run `sudo docker run crucian` to start bot

### Common settings
1.  Edit [.env](https://github.com/SoBusted/Crucian/blob/master/.env) to set process environment variables  
The OWNER_ID field should contain your **user ID** (example: 504338669268631562) not your discord id  
Click [here](https://www.youtube.com/watch?v=1T0L4c9hWTo) to see how to get your **user ID**  
If you want to use database(mysql) you should fill your mysql options

1.  Edit [data/config.json](https://github.com/SoBusted/Crucian/blob/master/data/config.json) according to your preference  
You MUST set USE_DATABASE field to false if you don't want to use database(mysql)