const connection = require("../database/connection");

module.exports = {
  async login(req, res) {
    const { matricula, acesso } = req.body;
    let auth = {};
    let reservation = {};
    let returnData = {};

    if (acesso === "colaborador") {
      auth = await new connection("colaborador")
        .select("*")
        .where("colaborador.matricula", "=", parseInt(matricula));
    }

    if (acesso === "aluno") {
      auth = await new connection("aluno")
        .select("*")
        .where("aluno.matricula", "=", matricula);
    }

    if (acesso === "aluno") {
      reservation = await new connection("reserva")
        .select("*")
        .where({ "reserva.matricula": matricula })
        .where({ "reserva.status": 12 });
    }

    if (Object.keys(reservation).length > 0) {
      returnData = {
        auth: acesso,
        access: false,
        name: "VOCÊ TEM UMA RESERVA!",
        reserva: true,
      };
      return res.json(returnData);
    }

    if (Object.keys(auth).length > 0 && Object.keys(auth).length < 2) {
      returnData = {
        auth: acesso,
        access: true,
        name: auth[0].nome,
        reserva: false,
      };
      return res.status(200).json(returnData);
    } else {
      returnData = {
        auth: acesso,
        access: false,
        name: "ACESSO NEGADO",
        reserva: false,
      };
      return res.status(200).json(returnData);
    }
  },
};
