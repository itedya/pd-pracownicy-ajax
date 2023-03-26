FROM node:18-alpine

RUN mkdir /app

COPY ./api /app/api
COPY ./validation /app/validation

WORKDIR /app/validation
RUN npm i
RUN npm link

WORKDIR /app/api
RUN npm i
RUN npm link @itedya/sor-tokajuk-pracownicy-ajax-validation

EXPOSE 3000
CMD ["npm", "run", "watch"]