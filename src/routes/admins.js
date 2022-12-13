const Router = require('koa-router');

const router = new Router();

// GET info users: si es admin los ve todos, si es usuario solo ve su perfil
router.get('users.show', '/users', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionId);
    if (!(session.adminId == null)) {
      const users = await ctx.orm.User.findAll({ attributes: { exclude: ['password'] } });
      ctx.body = users;
    } else if (session.userId) {
      const user = await ctx.orm.User.findByPk(session.userId, { attributes: { exclude: ['password'] } });
      ctx.body = user;
    } else {
      ctx.throw('No tienes permiso para ver esta información', 401);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
