const db = require("../config/Databases");
const User = db.user;

function auth(id) {
  return User.findAll({
    where: {
      telegram_id: id,
    },
  }).then(function (user) {
    if (user.length > 0) {
      return true;
    }
    return false;
  });
  
}

module.exports = auth;
