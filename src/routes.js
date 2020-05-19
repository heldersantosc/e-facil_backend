const express = require("express");
const routes = express.Router();

const UnitController = require("./controller/UnitController");
const StatusController = require("./controller/StatusController");

/** rota para página inicial  */
routes.get("/", (request, response) => {
  response.send(request.body);
});

/** rotas de unidades */
routes.get("/unit", UnitController.index);
routes.post("/unit/insert", UnitController.store);
routes.put("/unit/update", UnitController.update);
routes.delete("/unit/delete/:id", UnitController.delete);

/** rotas de status */
routes.get("/status", StatusController.index);

module.exports = routes;
