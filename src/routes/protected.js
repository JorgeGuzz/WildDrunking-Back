const Router = require('koa-router');

const router = new Router();

/* router.delete('players.delete', '/players/:playerId', async (ctx) => {
    try {
        console.log(ctx.state.tokendata.players);
        const players = ctx.state.tokendata.players;

        var found = false;

        players.forEach(player => {
            console.log(player.id);
            console.log(ctx.params.playerId);
            if (player.id == ctx.params.playerId) {
                found = true;
            };
        });

        if (found) {
            await ctx.orm.Player.destroy({
                where: { id: `${ctx.params.playerId}` }
            })
            ctx.status = 202;
        } else {
            ctx.throw('No tienes permiso para eliminar este jugador', 401);
        };
    } catch (error) {
        console.log(error);
        ctx.throw(error);
    }
}); */

// Admin elimina un usuario
router.delete('users.delete', '/users/:userId', async (ctx) => {
  try {
    console.log(ctx.state.tokendata.rol);
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionId);
    const rol = await ctx.state.tokendata.rol;
    const user = await ctx.orm.User.findByPk(ctx.params.userId);

    if (rol == 'Admin') {
      if (user) {
        await ctx.orm.User.destroy({
          where: { id: `${ctx.params.userId}` },
        });
        ctx.status = 202;
      } else {
        ctx.throw('Usuario no encontrado', 404);
      }
    } else if (rol == 'User') {
      if (user.id == session.userId) {
        await ctx.orm.User.destroy({
          where: { id: `${ctx.params.userId}` },
        });
        ctx.status = 202;
      } else {
        ctx.throw('No tienes permiso para eliminar este usuario', 401);
      }
    } else {
      ctx.throw('No tienes permiso para eliminar este usuario', 401);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
