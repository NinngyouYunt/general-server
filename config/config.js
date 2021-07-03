require("dotenv").config();

const config = {
  port: 3000 || process.env.PORT,
  mongo: {
    username: process.env.mongoUsername,
    password: process.env.mongoPassword
  },
  socketCors: {
    origin: "*"
  }
};

module.exports = config;
