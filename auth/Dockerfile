FROM node:alpine

WORKDIR /usr/app

ARG JWT
ARG MAIL
ARG DB

ENV CACB_JWT_PRIVATEKEY ${JWT}
ENV CACB_MAIL_PASSWORD ${MAIL}
ENV CACB_DB_PASSWORD ${DB}

COPY ./package*.json ./
RUN npm install 
COPY ./ ./

CMD ["npm", "run", "start"]