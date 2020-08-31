if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
}
const knexconfig = require("../../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexconfig);
const bookshelf = require("bookshelf")(knex);

module.exports = {
    bookshelf,
    knex,
    knexconfig,
    models: bookshelf.registry.models
};
