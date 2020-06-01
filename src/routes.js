const express = require("express");
const routes = express.Router();

const UnitController = require("./controller/UnitController");
const FloorController = require("./controller/FloorController");
const VacancyController = require("./controller/VacancyController");
const StatusController = require("./controller/StatusController");

/** rota para página inicial  */
routes.get("/", (request, response) => {
  response.send("Welcome to e-Facil");
});

/** rotas de unidades */
routes.get("/unit", UnitController.index);
routes.post("/unit/insert", UnitController.store);
routes.put("/unit/update", UnitController.update);
routes.delete("/unit/delete/:id", UnitController.delete);

/** rotas de vagas */
routes.get("/vacancies/:floor", VacancyController.index);

/** rotas de andar */
routes.get("/floor/:unit", FloorController.index);

/** rotas de status */
routes.get("/status", StatusController.index);

module.exports = routes;
