const express = require("express");
const routes = express.Router();

const AuthController = require("./controller/AuthController");
const UnitController = require("./controller/UnitController");
const FloorController = require("./controller/FloorController");
const VacancyController = require("./controller/VacancyController");
const StatusController = require("./controller/StatusController");
const ReservationController = require("./controller/ReservationController");

/** rota para página inicial  */
routes.get("/", (request, response) => {
  response.send("Welcome to e-Facil");
});

routes.post("/authorization", AuthController.login);

/** rotas de unidades */
routes.get("/unit", UnitController.index);
routes.post("/unit/insert", UnitController.store);
routes.put("/unit/update", UnitController.update);
routes.delete("/unit/delete/:id", UnitController.delete);

/** rotas de vagas */
routes.get("/vacancies/:id_unidade_andar", VacancyController.index);

/** rotas de andar */
routes.get("/floor/:unit", FloorController.index);

/** rotas de status */
routes.get("/status", StatusController.index);

/** rotas de reservas */
routes.get("/reservations", ReservationController.index);
routes.post("/reservations/", ReservationController.reservation);

module.exports = routes;
