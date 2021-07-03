require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongo: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  },
  socketCors: {
    origin: "*"
  }
};

module.exports = config;
