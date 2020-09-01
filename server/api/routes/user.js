const { Router } = require("express");
const { Session } = require("../models/account");
const { User } = require("../models/bookshelf_models");

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

        const userData = await User.forge({ username }).fetch({
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

module.exports = router;
