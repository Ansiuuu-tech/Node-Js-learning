const { getUser } = require("../service/auth");

function checkForAuthenticatedUser(req, res, next) {
    req.user = null;
    const token = req.cookies?.uid;
    if (!token) {
        const authorizationHeaderValue = req.headers["authorization"];
        if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
            return next();
        }

        req.user = getUser(authorizationHeaderValue.split("Bearer ")[1]);
        return next();
    }

    req.user = getUser(token);
    return next();
}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user||!roles.includes(req.user.role)){
            return res.redirect("/login");
        }
        return next();
    }
}
module.exports = { checkForAuthenticatedUser, restrictTo };