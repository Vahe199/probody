FROM node:16-buster

WORKDIR /app

RUN apt-get update && \
    apt-get install -y build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config && \
    yarn global add pm2

ENTRYPOINT export PATH="$(yarn global bin):$PATH" && \
           yarn && \
           pm2 start ecosystem.config.cjs && \
           pm2 logs
