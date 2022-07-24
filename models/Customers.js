const db = require("../utils/db");
const table = "customers";

async function getCountCustomers() {
    let query = `SELECT count(customer_id) as count FROM ${table}`;
    let result = await db.query(query);
    return parseInt(result.rows[0].count);
}

module.exports = {
    getCountCustomers,
};
