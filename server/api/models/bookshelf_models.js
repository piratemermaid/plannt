const { bookshelf } = require("../db/config");

const User = bookshelf.model("User", {
    tableName: "users"
});

module.exports = { User };
