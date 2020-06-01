const connection = require("../database/connection");

module.exports = {
  /** lista os andares */
  async index(request, response) {
    const { unit } = request.params;
    const list = await new connection("andar as a")
      .select("a.rowid", "a.unidade", "a.andar", "s.status_en as status")
      .leftJoin("status as s", "a.status", "=", "s.id_status")
      .where({ "a.unidade": unit })
      .orderBy("a.rowid", "desc");

    const vacancy = await new connection("vaga")
      .select("unidade", "andar")
      .where("unidade", 1)
      .count("andar");
    return response.json(vacancy);
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
