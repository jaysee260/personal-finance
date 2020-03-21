FROM node:10 as core-api
# Create app directory
WORKDIR /usr/app
# Install dependencies
COPY package*.json ./
RUN npm install
# Bundle app source code
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]