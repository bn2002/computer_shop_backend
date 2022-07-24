const Employees = require("../models/Employees");
const { ITEM_PER_PAGE } = require("../constant/index");
const { serverError } = require("../utils/error");

async function get(req, res) {
    let page = req.query.page || 1;
    page = page < 1 ? 1 : page;
    let perPage = req.query.size || ITEM_PER_PAGE;
    perPage = perPage > ITEM_PER_PAGE ? ITEM_PER_PAGE : perPage;

    let result = await Employees.get(page, perPage).catch((err) => {
        serverError(res, err);
    });
    let totalEmployee = await Employees.getCount().catch((err) => {
        serverError(res, err);
    });

    if (typeof result !== "undefined" && typeof totalEmployee !== "undefined")
        res.json({
            status: true,
            totalItems: totalEmployee,
            totalPages: Math.ceil(totalEmployee / perPage),
            currentPage: parseInt(page),
            data: result,
        });
}

module.exports = {
    get,
};
