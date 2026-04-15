const { getUser } = require("../service/auth");
async function restrictToAuthenticatedUsers(req, res, next) {
    const sessionId = req.cookies.uid || req.cookies.sessionId;
    if (!sessionId) {
        return res.status(401).render("login", {
            error: "Please log in to access this page.",
        });
    }

    const user = getUser(sessionId);
    if (!user) {
        return res.status(401).render("login", {
            error: "Please log in to access this page.",
        });
    }

    req.user = user;
    next();
}

module.exports = { restrictToAuthenticatedUsers };