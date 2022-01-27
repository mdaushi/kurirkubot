const db = require("../config/Databases");
const User = db.user;

function auth(ctx) {
  return User.findAll({
    where: {
      telegram_id: ctx.from.id,
    },
  }).then(function (user) {
    exceptCommand(ctx)
    if (user.length > 0) {
      return true;
    }else{}
    return false;
  });
  
}

function exceptCommand(ctx) {
  const commands = ['/daftar'];
  if(commands.find((str) => str === ctx.message.text)){
    return true;
  }
  return false
}

module.exports = auth;
