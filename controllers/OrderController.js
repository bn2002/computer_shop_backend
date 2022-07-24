const Orders = require("../models/Orders");
const {
    ORDER_SUCCESS_STATUS,
    ORDER_PENDING_STATUS,
} = require("../constant/index");
const { serverError } = require("../utils/error");

async function getCountOrderByStatus(req, res) {
    let status = req.query.status || ORDER_SUCCESS_STATUS;
    status = status.toLowerCase();
    let listAcceptStatus = [ORDER_SUCCESS_STATUS, ORDER_PENDING_STATUS];
    if (!listAcceptStatus.includes(status)) {
        return res.json({
            status: false,
            message: "Trạng thái không hợp lệ",
        });
    }
    let result = await Orders.getCountOrderByStatus(status).catch((err) => {
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
    getCountOrderByStatus,
};
