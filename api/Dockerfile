FROM node:alpine
WORKDIR /todo-api
COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]
ENV NAME api
EXPOSE 5000



