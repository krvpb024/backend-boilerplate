FROM node:carbon
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
COPY . /usr/src/app
ENV NODE_ENV=production
EXPOSE 5000
CMD [ "npm", "start" ]