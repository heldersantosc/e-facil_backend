const express = require("express");
const errors = express.Router();

/** Erro de página não encontrada */
errors.use((req, res, next) => {
  res.status(404).send("<h1>Sorry cant find that!</h1>");
});

/** Tempo de resposta  */
errors.use((err, req, res, next) => {
  res.status(500).send("<h2>Something broke!</h2>");
});

/** Não autorizado  */
errors.use((err, req, res, next) => {
  res.status(401).send("<h2>Unauthorized!</h2>");
});

/** Similar ao 401 porém se  */
errors.use((err, req, res, next) => {
  res.status(401).send("<h2>Unauthorized!</h2>");
});

module.exports = errors;
