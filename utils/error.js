module.exports = {
    serverError: (res, err) => {
        return res.json({ status: false, message: "500 server error", err });
    },
};
