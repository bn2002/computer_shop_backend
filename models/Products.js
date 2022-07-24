const db = require("../utils/db");
const { MAX_TOP_SELLING_PRODUCT } = require("../constant/index");
const table = "products";
async function get(filters, page, perPage) {
    let query = `SELECT * FROM ${table} `;

    if (Object.keys(filters).length) {
        let listFilters = [];
        for (let filter in filters) {
            if (filters[filter]) {
                listFilters.push(`${filter} = '${filters[filter]}'`);
            }
        }

        if (listFilters.length > 0) {
            query += ` WHERE `;
            query += listFilters.join(" AND ");
        }
    }

    query += ` LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`;
    let result = await db.query(query);
    return result.rows;
}

async function getCountProduct(filters) {
    let query = `SELECT COUNT(product_id) as count FROM ${table} `;

    if (Object.keys(filters).length) {
        let listFilters = [];
        for (let filter in filters) {
            if (filters[filter]) {
                listFilters.push(`${filter} = '${filters[filter]}'`);
            }
        }

        if (listFilters.length > 0) {
            query += ` WHERE `;
            query += listFilters.join(" AND ");
        }
    }

    let result = await db.query(query);
    return parseInt(result.rows[0].count);
}

async function getTopSellingProducts(category) {
    let query = "SELECT * FROM products";
    if (category) {
        query += ` WHERE category_id = $1 `;
    }

    query += ` ORDER BY quantity_sold desc LIMIT ${MAX_TOP_SELLING_PRODUCT} `;
    let result;
    if (category) {
        result = await db.query(query, [category]);
    } else {
        result = await db.query(query);
    }

    return result.rows;
}

async function getTopPromotionsProducts() {
    let query = `SELECT products.*, percentage_reduce  FROM promotions 
            INNER JOIN products using(product_id) 
            WHERE  end_at >= current_date
            ORDER BY percentage_reduce desc limit 5
    `;
    let result = await db.query(query);
    return result.rows;
}

module.exports = {
    get,
    getCountProduct,
    getTopSellingProducts,
    getTopPromotionsProducts,
};
