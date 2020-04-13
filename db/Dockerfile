FROM node:12-slim

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER root
WORKDIR /db
COPY ./ /db

RUN npm i -g prisma@1.34.10
RUN npm i

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ./docker-scripts/entrypoint.sh
