const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const list = await new connection("reserva").select("*");

    return res.send(list);
  },

  async delete(req, res) {
    return res.send("delete");
  },

  /** reservar uma vaga */
  async reservation(request, response) {
    const { vaga, matricula, status, hora } = request.body.data;
    const datahora = new Date();
    const data = datahora.toISOString().slice(0, 10);

    await new connection("reserva")
      .select("*")
      .where("matricula", "=", matricula)
      .then(async (data) => {
        if (data.length <= 0) {
          await insertReservation();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    /** função pra inserir na tabela de reserva */
    async function insertReservation() {
      console.log("insertReservation");
      return await new connection("reserva")
        .insert({
          id_vaga: vaga,
          matricula: matricula,
          status: status,
          data_entrada: data,
          hora_entrada: hora,
        })
        .then(async () => {
          await new connection("vaga")
            .where({
              id_vaga: vaga,
            })
            .update({ status: 4 });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return response.json("verificaReserva");
  },
};
