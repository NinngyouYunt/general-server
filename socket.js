const TodoStore = require("./dal/todos");
const SocketEvent = require("./config/SocketEvent");

const todoStore = new TodoStore();

function onJoin(client, io) {
  console.log(`Client ${client.id} connected`);
  todoStore.findAll().then(data => {
    client.emit("push-todo-change", data);
  });
}
function onLeave(client, io) {
  client.on("disconnect", () => {
    console.log(`Client ${client.id} disconnected`);
  });
}

module.exports = (io) => {
  io.on("connection", (client) => {
    onJoin(client);
    onLeave(client);
    client.on("add-todo", (string) => {
      const obj = {
        content: string,
        creationDate: new Date()
      }
      todoStore.insert(obj).then(() => {
        todoStore.findAll().then(data => {
          client.emit("push-todo-change", data);
        });
      });
    });

    client.on("remove-todo", todo => {
      todoStore.remove({ _id: todo._id }).then(() => {
        todoStore.findAll().then(data => {
          client.emit("push-todo-change", data);
        });
      });
    });
  });
};
