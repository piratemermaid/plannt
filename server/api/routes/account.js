const { Router } = require("express");
const { knex } = require("../../db/config");
const bcrypt = require("bcrypt");
const { getAccount, hash, Session, setSession } = require("../helpers/account");

const router = new Router();

router.post("/signup", async (req, res, next) => {
    const { username, email, password, passwordMatch } = req.query;

    if (password !== passwordMatch) {
        res.status(401).send("Passwords do not match");
        return;
    }

    const account = await getAccount(username);
    if (account) {
        res.status(401).send("Username taken");
        return;
    }

    if (!account) {
        knex("users")
            .insert({
                username,
                email,
                password: hash(password)
            })
            .then(() => {
                res.send({ signup: "success" });
            })
            .catch((err) => {
                next(err);
            });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.query;

    const account = await getAccount(username);

    if (!account) {
        res.status(401).send("Incorrect username/password");
    } else {
        if (await bcrypt.compare(password, account.password)) {
            setSession({
                username,
                res,
                sessionId: account.sessionId
            }).then(() => {
                res.send({ login: "success" });
            });
        } else {
            res.status(401).send("Incorrect username/password");
        }
    }
});

router.get("/logout", async (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    await knex("users")
        .where({ username })
        .update({ sessionId: null })
        .then(() => {
            res.clearCookie("sessionString");

            res.send({ logout: "success" });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/authenticated", async (req, res) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        res.send({ authenticated: false });
    } else {
        const { username, id } = Session.parse(sessionString);
        const account = await getAccount(username);
        if (account) {
            res.send({ authenticated: true });
        } else {
            res.send({ authenticated: false });
        }
    }
});

module.exports = router;
