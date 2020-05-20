/** framework para node */
const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
const errors = require("./errors/errors");

const app = express();

/** funcao para ser usado em navegadores externos  */
app.use(cors());

/** chamada para usar json no body */
app.use(express.json());

/** usar as rotas configurada */
app.use(routes);
app.use(errors);

/** desabilitando o x-powered-by */
app.disable("x-powered-by");

/** tratativa de leaking de erro  */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Houve um problema ao executar a operação. Tente mais tarde",
  });
});

module.exports = app;
