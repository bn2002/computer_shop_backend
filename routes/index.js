const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const OrderController = require("../controllers/OrderController");
const CustomerController = require("../controllers/CustomerController");
const EmployeeController = require("../controllers/EmployeeController");

module.exports = (app) => {
    app.route("/products/top-promotions-products").get(
        ProductController.getTopPromotionsProducts
    );
    app.route("/products/top-selling").get(
        ProductController.getTopSellingProducts
    );

    app.route("/products/total").get(ProductController.getTotalProducts);

    app.route("/products").get(ProductController.get);
    app.route("/products/:productId").get(ProductController.detail);
    app.route("/categories").get(CategoryController.get);

    app.route("/orders/total").get(OrderController.getCountOrderByStatus);

    app.route("/customers/total").get(CustomerController.getCount);

    app.route("/employees").get(EmployeeController.get);
};
