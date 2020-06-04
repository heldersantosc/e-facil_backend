const connection = require("../database/connection");

module.exports = {
  /** lista os andares */
  async index(request, response) {
    const { unit } = request.params;
    const list = await new connection("unidade")
      .select("id_unidade_andar", "unidade.andar", "status.status_en as status")
      .leftJoin("status", "unidade.status", "=", "status.id_status")
      .where("unidade.unidade", "=", `${unit}`);
    const countFloor = await new connection("vaga")
      .count("vaga.vaga as total")
      .where("vaga.id_unidade_andar", "=", "11-S1");

    const reserva = await new connection("reserva")
      .join("vaga", "vaga.id_vaga", "=", "reserva.id_vaga")
      .where("reserva.data_entrada", "=", "2020-06-06")
      .select(
        "reserva.id_reserva as reserva",
        "vaga.id_unidade_andar as unidade_andar",
        "reserva.id_vaga as vaga"
      );
    console.log(reserva);
    return response.json({ floor: list });
  },

  /** criação de unidade */
  async store(request, response) {
    const unit = {};
    unit.name = request.body.name;
    unit.status_id = request.body.status_id;
    const query = await new connection("unidade")
      .insert(unit)
      .then(() => {
        console.log("store");
        return response
          .status(200)
          .json({ sucess: "Unidade cadastrada com sucesso" });
      })
      .catch((err) => {
        console.clear();
        console.log(err);
        return response.json({ erro: "Unidade já cadastrada" });
      });
  },

  /** atualiza unidade */
  async update(request, response) {
    const { id, status_id } = request.body;
    const query = await new connection("unidade")
      .where("id", "=", id)
      .update({ status_id: status_id })
      .decrement({
        balance: 50,
      })
      .clearCounters()
      .then(() => {
        console.log("update");
        return response.json({
          success: `Campo ${id} atualizado com sucesso!`,
        });
      })
      .catch((err) => {
        return response.json(err);
      });
  },

  /** deleta uma unidade */
  async delete(request, response) {
    const { id } = request.params;
    const query = await new connection("unidade").where("id", id).del();
    console.log("delete");
    return response.json(id);
  },
};
