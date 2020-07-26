## How to run
### Local setup
#### For Linux
1.  Run `git clone https://github.com/xCrypt0r/Crucian.git` to clone this repository

1.  Run `cd Crucian` to move to Crucian folder

1.  Run `sudo apt-get install nodejs npm` to install [node.js](https://nodejs.org) and [npm](https://www.npmjs.com)

1.  Run `npm install` to install all dependencies listed in [package.json](package.json#L23)

1.  Run `sudo apt-get install ffmpeg` to install [ffmpeg](https://www.ffmpeg.org) (for music bot features)

1.  Run `npm start` or `node bot.js` to start bot

### Heroku setup
#### For Linux
1.  Run `git clone https://github.com/xCrypt0r/Crucian.git` to clone this repository

1.  Run `cd Crucian` to move to Crucian folder

1.  Run `sudo snap install --classic heroku` to install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

1.  Run `heroku local` to start bot

### Docker setup
#### For Linux
1.  Run `git clone https://github.com/xCrypt0r/Crucian.git` to clone this repository

1.  Run `cd Crucian` to move to Crucian folder

1.  Run `sudo apt install docker.io` to install [docker](https://www.docker.com)

1.  Run `sudo systemctl start docker && sudo systemctl enable docker` to start docker and run automatically at startup

1.  Run `sudo docker build -t crucian .` to make docker image with [Dockerfile](Dockerfile)
This takes about 5-10 minutes, so be patient

1.  Run `sudo docker run crucian` to start bot

### Common settings
1.  Edit [.env.example](.env.example) to set process environment variables and Rename this file to ".env"
The OWNER_ID field should contain your **user ID** (example: 504338669268631562)
Click [here](https://www.youtube.com/watch?v=1T0L4c9hWTo) to see how to get your **user ID**

1.  Edit [assets/json/config.json](assets/json/config.json) according to your preference
