const connection = require("../database/connection");

module.exports = {
  /** exibe uma lista de reservar */
  async index(req, res) {
    const list = await new connection("reserva").select("*");
    return res.send(list);
  },

  /** libera a vaga */
  async remove(req, res) {
    const { id } = req.params;
    const datahora = new Date();
    const data = datahora.toISOString().slice(0, 10);
    const hora = datahora.toISOString().slice(11, 19);

    const vaga = await new connection("reserva")
      .select("id_vaga")
      .where({ matricula: id })
      .where({ status: 12 });

    if (vaga.length > 0) {
      await new connection("reserva")
        .where({ matricula: id })
        .where({ status: 12 })
        .update({ status: 13, data_saida: data, hora_saida: hora });

      await new connection("vaga")
        .where({ id_vaga: vaga[0].id_vaga })
        .update({ status: 3 });
    }

    return res.send("delete");
  },

  /** reservar uma vaga */
  async reservation(request, response) {
    const { vaga, matricula } = request.body.data;
    const datahora = new Date();
    const data = datahora.toISOString().slice(0, 10);
    const hora = datahora.toISOString().slice(11, 19);

    await new connection("reserva")
      .select("*")
      .where({ matricula: matricula })
      .where({ status: 12 })
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
      return await new connection("reserva")
        .insert({
          id_vaga: vaga,
          matricula: matricula,
          status: 12,
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
