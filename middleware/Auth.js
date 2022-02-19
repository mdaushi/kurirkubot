function auth(ctx, next) {
  const property = 'data'
  const telegram_id = ctx.from.id;
  const userExists = ctx[property + 'DB'].get('users').getById(telegram_id).value()
  if (!userExists) {
    return ctx.reply('Anda belum terdaftar, silahkan daftar terlebih dahulu.')
  }
  return next()
}

module.exports = auth