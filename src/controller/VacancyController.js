const connection = require("../database/connection");

module.exports = {
  /** lista as unidades */
  async index(request, response) {
    const { id_unidade_andar } = request.params;
    const list = await new connection("vaga")
      .select(
        "vaga.id_vaga",
        "vaga.id_unidade_andar",
        "vaga.vaga",
        "status.status_en as status",
        "vaga.acessibilidade"
      )
      .join("status", "vaga.status", "=", "status.id_status")
      .where({ id_unidade_andar: `${id_unidade_andar}` });

    return response.json(list);
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
