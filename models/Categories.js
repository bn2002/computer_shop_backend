const db = require("../utils/db");
const table = "categories";

async function get() {
    let query = `SELECT * FROM ${table}`;
    let result = await db.query(query);
    return result.rows;
}

exports.get = get;
