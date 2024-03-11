module.exports = app => {
    require('../passport.js');

    require('dotenv').config();

    const auth = require("../controllers/auth.controller.js");

    const passport = require('passport');

    const authMiddle = require('../middlewares/user.middleware.js');

    const router = require("express").Router();

    router.post("/register", auth.register);

    router.post("/login", auth.signin);
    
    router.get("/login/failed", (req, res) => {
            res.status(401).json({
                error: true,
                message: "Log in failure",
            });
        });

    // login GG
    router.get('/google', passport.authenticate('google',{
            scope: ["profile", "email"]}
        ));
    
    router.get(
            "/google/callback",
            passport.authenticate('google', {
                prompt: 'select_account',
                successRedirect: `${process.env.CLIENT_URL}` + 'home',
                failureRedirect: "auth/login/failed",
            }),
        );

    router.get("/logout", (req, res) => {
            req.session = null;
            req.logout();
            res.redirect('/');
        });

    app.use('/auth', router);
}; 
