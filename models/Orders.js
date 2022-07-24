const db = require("../utils/db");
const { MAX_TOP_SELLING_PRODUCT } = require("../constant/index");
const table = "orders";

async function getCountOrderByStatus(status) {
    let query = `SELECT COUNT(order_id) as count FROM ${table} WHERE order_status = '${status}'`;

    let result = await db.query(query);
    return parseInt(result.rows[0].count);
}

module.exports = {
    getCountOrderByStatus,
};
