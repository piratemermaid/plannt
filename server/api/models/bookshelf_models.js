const { bookshelf } = require("./config");

const User = bookshelf.model("User", {
    tableName: "users"
});

module.exports = { User };
