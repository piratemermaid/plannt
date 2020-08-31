const { knex } = require("../config");
const { testUser, plants, plans, plantCare } = require("../testData");

exports.seed = async function (knex) {
    for (let table of tableOrder) {
        await resetTable(table);
    }

    await knex("users").insert(testUser);

    for (let plant of plants) {
        const { name, nickname, type } = plant;
        await knex("plants").insert({ name, nickname, type });
    }

    for (let plan of plans) {
        const { plantName, username, instructions } = plan;

        const user = await knex("users")
            .where({ username: "testuser" })
            .first();
        const user_id = user.id;

        const plant = await knex("plants").where({ name: plantName }).first();
        const plant_id = plant.id;

        await knex("plans").insert({
            user_id,
            plant_id,
            ...instructions
        });
    }

    for (let careDates of plantCare) {
        const { plantName, username, care } = careDates;

        const user = await knex("users").where({ username: username }).first();
        const user_id = user.id;

        const plant = await knex("plants").where({ name: plantName }).first();
        const plant_id = plant.id;

        await knex("care").insert({
            user_id,
            plant_id,
            ...care
        });
    }
};

// delete table and reset to start at id 1
const resetTable = async (table) => {
    await knex(table).del();
    await knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`);
};

const tableOrder = ["plans", "care", "users", "plants"];
