const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");

module.exports = (app) => {
    app.route("/products/top-promotions-products").get(
        ProductController.getTopPromotionsProducts
    );
    app.route("/products/top-selling-products").get(
        ProductController.getTopSellingProducts
    );
    app.route("/products").get(ProductController.get);
    app.route("/categories").get(CategoryController.get);
};
