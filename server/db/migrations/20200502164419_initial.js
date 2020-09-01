exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username").unique().notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("sessionId");
        table.string("reset_password_token");
        table.timestamp("reset_token_expiry");
    });

    await knex.schema.createTable("plants", (table) => {
        table.increments("id");
        table.string("name");
        table.string("nickname");
        table.string("type"); // name family or something?
    });

    await knex.schema.createTable("plans", (table) => {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.integer("plant_id").references("id").inTable("plants");
        table.string("watering_instructions");
        table.integer("watering_days");
        table.integer("mist_days");
        table.string("sunlight_level");
        table.string("repot");
        table.boolean("indoor");
        table.boolean("outdoor");
        table.string("temperature");
        table.string("humidity");
        table.string("harvest_instructions");
        table.jsonb("lifespan"); //might rename
        table.text("notes");
    });

    await knex.schema.createTable("care", (table) => {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.integer("plant_id").references("id").inTable("plants");
        table.date("watered");
        table.date("misted");
        table.date("repotted");
        table.date("dusted");
    });
};

exports.down = async function (knex) {
    const tableOrder = ["users", "plants", "plans", "care"];

    for (let i = tableOrder.length - 1; i >= 0; i--) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
