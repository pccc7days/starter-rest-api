FROM node:20-alpine

WORKDIR /var/www

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "/var/www/dist/index.js"]