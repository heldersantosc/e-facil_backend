const app = require("./app");
const port = 3333;

app.listen(port, () => {
  console.clear();
  console.log("e-Facil on server port: " + port);
});
