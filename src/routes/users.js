const Router = require('koa-router');

const router = new Router();

// GET info user (sesión iniciada)
router.get('users.show', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionId);
    const user_id = await session.userId;

    const user = await ctx.orm.User.findByPk(user_id, {});
    ctx.body = user;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
