const { ObjectID } = require("mongodb");
const Mongo = require("./mongo");

module.exports = class TodoStore {
  constructor() {
    this.mongo = new Mongo();
  }
  async getCollection() {
    return (await this.mongo.getDb()).collection("todos");
  }
  async findAll() {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }
  async insert(data) {
    const collection = await this.getCollection();
    return await collection.insertOne(data);
  }
  async remove(filter) {
    if (filter._id)
      filter._id = ObjectID(filter._id);
    const c = await this.getCollection();
    return await c.deleteOne(filter);
  }
}
