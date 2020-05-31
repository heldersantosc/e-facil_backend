const app = require("./app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //console.clear();
  console.log("e-Facil on server port: " + PORT);
});
