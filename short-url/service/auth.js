const jwt = require('jsonwebtoken');
const secretKey="anshugaur@123";
function setUser(user) {
  return jwt.sign({
    id: user._id,
    email: user.email,
    
  },secretKey);
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null; // ✅ prevent crash
    }
}
module.exports = { setUser, getUser };