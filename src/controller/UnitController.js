const connection = require("../database/connection");

module.exports = {
  /** lista as unidades */
  async index(request, response) {
    const list = await new connection("unit")
      .join("status", "unit.status_id", "=", "status.id")
      .select("unit.id", "unit.name", "status.name as status");

    console.log("index");
    return response.json(list);
  },

  /** criação de unidade */
  async store(request, response) {
    const unit = {};
    unit.name = request.body.name;
    unit.status_id = request.body.status_id;
    const query = await new connection("unit")
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
    const query = await new connection("unit")
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
    const query = await new connection("unit").where("id", id).del();
    console.log("delete");
    return response.json(id);
  },
};
