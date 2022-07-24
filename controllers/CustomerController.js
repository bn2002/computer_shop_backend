const Customers = require("../models/Customers");
const { serverError } = require("../utils/error");

async function getCount(req, res) {
    let result = await Customers.getCountCustomers().catch((err) => {
        serverError(res, err);
    });

    if (typeof result !== "undefined") {
        return res.json({
            status: true,
            data: result,
        });
    }
}

module.exports = {
    getCount,
};
