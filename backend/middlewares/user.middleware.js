const User = require('../models/user.model');

isAdmin = (req, res, next) => {
    const oldUser = User.findById(req.id);
    if (!User) {
        res.status(500).send({message: err});
        return
    }
    else {
        if (oldUser.role_id == 1) {
            next();
            return;
        }
    }
    res.status(403).send({message: "Admin Role Required"});
    return;
}

isDoctor = (req, res, next) => {
    const oldUser = User.findById(req.id);
    if (!oldUser) {
        res.status(500).send({message: err});
        return
    }
    else {
        if (oldUser.role_id == 2) {
            next();
            return;
        }
    }
    res.status(403).send({message: "Doctor Role Required"});
    return;
}

checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect(`${process.env.CLIENT_URL}`+ "signin")
}


const authMiddle = {
    isAdmin,
    isDoctor,
    checkAuthenticated
};

module.exports = authMiddle;
