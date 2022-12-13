const Router = require('koa-router');

const router = new Router();

// GET all shots
router.get('shots.show', '/', async (ctx) => {
  try {
    const shots = await ctx.orm.Shot.findAll();

    ctx.body = shots;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
