const { Router } = require("express");
const models = require("../models/bookshelf_models");
const { knex } = require("../../db/config");

const router = new Router();

router.get("/", (req, res) => {
    res.send({ api: "app" });
});

router.get("/plants", async function (req, res) {
    const data = await models.Plant.forge().fetchAll();
    const plants = data.toJSON();
    res.send(
        plants.map(({ name, nickname, type }) => {
            return { name, nickname, type };
        })
    );
});

router.post("/add_plant", async function (req, res) {
    const { name, nickname, type } = req.query;

    // TODO: look up if plant exists first

    if (!name) {
        res.send({ error: "Please include the plant's name" });
    } else if (!type) {
        res.send({
            error:
                "Please include the plant's type (e.g. vine, succulent, citrus)"
        });
    } else {
        await knex("plants").insert({ name, nickname, type });

        res.send({ success: `added ${name}` });
    }
});

module.exports = router;
