const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const OrderController = require("../controllers/OrderController");

module.exports = (app) => {
    app.route("/products/top-promotions-products").get(
        ProductController.getTopPromotionsProducts
    );
    app.route("/products/top-selling-products").get(
        ProductController.getTopSellingProducts
    );

    app.route("/products/total-product").get(
        ProductController.getTotalProducts
    );

    app.route("/products").get(ProductController.get);
    app.route("/products/:productId").get(ProductController.detail);
    app.route("/categories").get(CategoryController.get);

    app.route("/orders/total-orders").get(
        OrderController.getCountOrderByStatus
    );
};
