const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./api/routes/account");
const userRouter = require("./api/routes/user");
const appRouter = require("./api/routes/app");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/account", accountRouter);
app.use("/api/user", userRouter);
app.use("/api/app", appRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: "error",
        message: err.message
    });
});

const port = process.env.PORT || 8001;
app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
