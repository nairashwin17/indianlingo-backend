const ensureAuthenticated = require("../Middlewares/AuthCheck");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            fullname: "Ashwin Nair",
            role: "Admin"
        },
        {
            fullname: "Pranali Ashwin Nair",
            role: "Boss"
        }
    ])
});

module.exports = router;