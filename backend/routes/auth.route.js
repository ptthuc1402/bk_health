module.exports = app => {

    const auth = require("../controllers/auth.controller.js");

    const router = require("express").Router();

    router.post("/register", auth.register);

    router.post("/login", auth.signin);
    
    router.get("/login/failed", (req, res) => {
            res.status(401).json({
                error: true,
                message: "Log in failure",
            });
        });

    router.get("/logout", (req, res) => {
            req.session = null;
            req.logout();
            res.redirect('/login');
    })

    app.use('/auth', router);
};
