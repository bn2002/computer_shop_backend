const Products = require("../models/Products");
const { ITEM_PER_PAGE } = require("../constant/index");
const { serverError } = require("../utils/error");

async function get(req, res) {
    let page = req.query.page || 1;
    page = page < 1 ? 1 : page;
    let perPage = req.query.size || ITEM_PER_PAGE;
    perPage = perPage > ITEM_PER_PAGE ? ITEM_PER_PAGE : perPage;

    let category = req.query.category;
    let filters = {
        category_id: category,
    };
    let result = await Products.get(filters, page, perPage).catch((err) => {
        serverError(res, err);
    });
    let totalProduct = await Products.getCountProduct(filters).catch((err) => {
        serverError(res, err);
    });

    res.json({
        status: true,
        totalItems: totalProduct,
        totalPages: Math.ceil(totalProduct / perPage),
        currentPage: parseInt(page),
        data: result,
    });
}

async function getTopSellingProducts(req, res) {
    let result = await Products.getTopSellingProducts(req.query.category).catch(
        (err) => {
            serverError(res, err);
        }
    );

    if (result) {
        res.json({
            status: true,
            data: result,
        });
    }
}

async function getTopPromotionsProducts(req, res) {
    let result = await Products.getTopPromotionsProducts(
        req.query.category
    ).catch((err) => {
        serverError(res, err);
    });

    if (result) {
        res.json({
            status: true,
            data: result,
        });
    }
}

async function detail(req, res) {
    let result = await Products.getDetailProduct(req.params.productId).catch(
        (err) => {
            serverError(res, err);
        }
    );

    if (result) {
        return res.json({
            status: true,
            data: result,
        });
    }
    res.json({
        status: false,
        message: "Sản phẩm này không tồn tại",
    });
}

async function getTotalProducts(req, res) {
    let result = await Products.getTotalProducts(req.query.category).catch(
        (err) => {
            serverError(res, err);
        }
    );

    return res.json({
        status: true,
        data: result,
    });
}

module.exports = {
    get,
    getTopSellingProducts,
    getTopPromotionsProducts,
    detail,
    getTotalProducts,
};
