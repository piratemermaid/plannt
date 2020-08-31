const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
    res.send({ plants: [], plans: [] });
});

module.exports = router;
