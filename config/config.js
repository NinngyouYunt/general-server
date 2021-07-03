require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongo: {
    username: process.env.mongoUsername,
    password: process.env.mongoPassword
  },
  socketCors: {
    origin: "*"
  }
};

module.exports = config;
