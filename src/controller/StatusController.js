const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const query = await connection("status").select("*");
    console.log("index");
    return response.json(query);
  }
};
