const { bookshelf } = require("../../db/config");

const User = bookshelf.model("User", {
    tableName: "users",
    plans() {
        return this.hasMany("Plan");
    }
});

const Plant = bookshelf.model("Plant", {
    tableName: "plants"
});

const Plan = bookshelf.model("Plan", {
    tableName: "plans",
    plant() {
        return this.belongsTo("Plant");
    }
});

module.exports = { User };
