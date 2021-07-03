const { MongoClient } = require("mongodb");
const config = require("../config/config");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${config.mongo.username}:${config.mongo.password}@cluster0.7kdcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = class Mongo {
  static client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
  async connect() {
    if (!Mongo.client.isConnected()) {
      await Mongo.client.connect();
      console.log(`Connecting mongo ${Mongo.client.isConnected()}`)
    }
  }
  async getDb(name = "sandbox") {
    await this.connect();
    return Mongo.client.db(name);
  }
  async close() {
    Mongo.client.close();
  }
};
