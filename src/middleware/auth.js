module.exports = async (ctx, next) => {
  if (!ctx.session.sessionId) {
    ctx.throw('Debes iniciar sesión', 401);
  }

  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionId);
    if (session) {
      await next();
    } else {
      ctx.throw('La sesión es inválida, inicia sesión nuevamente', 401);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
};
