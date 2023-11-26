FROM node:20-alpine

WORKDIR /var/www

COPY . .

EXPOSE 3000

RUN ls -la /var/www

CMD ["node", "/var/www/dist/index.js"]