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
};

exports.down = async function (knex) {
    const tableOrder = ["users"];

    for (let i = tableOrder.length - 1; i >= 0; i--) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
