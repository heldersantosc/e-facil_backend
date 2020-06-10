const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    /** exibe lista de status */
    const query = await connection("status").select("*");
    return response.json(query);
  },
};
