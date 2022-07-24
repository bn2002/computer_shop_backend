module.exports = {
    serverError: (res, err) => {
        res.json({ status: false, message: "500 server error", err });
    },
};
