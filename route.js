const TodoStore = require("./dal/todos");

const todoStore = new TodoStore();

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("<h1>connected</h1>");
  })
  app.get("/todos", async (req, res) => {
    const list = await todoStore.findAll();
    let result = "<ol>";
    list.forEach(item => {
      result = `${result}<li>${item.content}</li>`;
    });
    result += "</ol>";
    res.send(result);
  });
}
