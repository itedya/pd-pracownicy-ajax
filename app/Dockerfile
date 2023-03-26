FROM node:18-alpine

RUN mkdir /app

COPY ./app /app/app
COPY ./validation /app/validation

WORKDIR /app/validation
RUN npm i
RUN npm link

WORKDIR /app/app
RUN npm i
RUN npm link @itedya/sor-tokajuk-pracownicy-ajax-validation

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]