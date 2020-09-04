const { Router } = require("express");
const { Session } = require("../models/account");
const models = require("../models/bookshelf_models");
const { knex } = require("../../db/config");

const router = new Router();

router.get("/", async function (req, res) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        // TODO: remove testing username
        // const { username } = Session.parse(sessionString);
        const username = "testuser";

        const userData = await models.User.forge({ username }).fetch({
            withRelated: ["plans.plant"]
        });

        const { plans } = userData.toJSON();

        res.send({
            plans: plans.map(
                ({
                    watering_instructions,
                    watering_days,
                    mist_days,
                    sunlight_level,
                    indoor,
                    outdoor,
                    temperature,
                    humidity,
                    harvest_instructions,
                    lifespan,
                    notes,
                    plant
                }) => {
                    const { name, nickname, type } = plant;
                    return {
                        watering_instructions,
                        watering_days,
                        mist_days,
                        sunlight_level,
                        indoor,
                        outdoor,
                        temperature,
                        humidity,
                        harvest_instructions,
                        lifespan,
                        notes,
                        name: plant.name,
                        plant: { name, nickname, type }
                    };
                }
            )
        });
    }
});

router.post("/new_plan", async function (req, res) {
    const { sessionString } = req.cookies;
    const { name } = req.query;

    console.log("new plan");

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        console.log(username);
        const user = await knex("users").where({ username });
        console.log(user.id);

        // await knex('plans').insert({

        // })

        // const { plans } = userData.toJSON();

        // res.send({
        //     plans: plans.map(
        //         ({
        //             watering_instructions,
        //             watering_days,
        //             mist_days,
        //             sunlight_level,
        //             indoor,
        //             outdoor,
        //             temperature,
        //             humidity,
        //             harvest_instructions,
        //             lifespan,
        //             notes,
        //             plant
        //         }) => {
        //             const { name, nickname, type } = plant;
        //             return {
        //                 watering_instructions,
        //                 watering_days,
        //                 mist_days,
        //                 sunlight_level,
        //                 indoor,
        //                 outdoor,
        //                 temperature,
        //                 humidity,
        //                 harvest_instructions,
        //                 lifespan,
        //                 notes,
        //                 name: plant.name,
        //                 plant: { name, nickname, type }
        //             };
        //         }
        //     )
        // });
    }
});

module.exports = router;
