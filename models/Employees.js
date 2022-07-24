const db = require("../utils/db");
const { MAX_TOP_SELLING_PRODUCT } = require("../constant/index");
const table = "employees";
async function get(page, perPage) {
    let query = `SELECT employee_id, username, fullname, email, phone_number, employee_id, gender, role, is_block, created_at FROM ${table} `;

    query += ` LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`;
    let result = await db.query(query);
    return result.rows;
}

async function getCount(filters) {
    let query = `SELECT COUNT(employee_id) as count FROM ${table} `;

    let result = await db.query(query);
    return parseInt(result.rows[0].count);
}

module.exports = {
    get,
    getCount,
};
