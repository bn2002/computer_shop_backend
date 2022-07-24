const Categories = require("../models/Categories");
const { serverError } = require("../utils/error");

exports.get = async (req, res) => {
    let categories = await Categories.get().catch((err) => {
        serverError(res, err);
    });
    res.json({ status: true, categories: categories });
};
