FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.10.0/wait /wait
RUN chmod +x /wait

RUN npm i

EXPOSE 3000
CMD ["npm", "run", "watch"]