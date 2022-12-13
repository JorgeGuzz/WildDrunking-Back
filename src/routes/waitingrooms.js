const Router = require('koa-router');

const router = new Router();

// SHOW ALL WAITING ROOMS
router.get('waitingrooms.show', '/show', async (ctx) => {
  try {
    const WR = await ctx.orm.WaitingRoom.findAll();
    ctx.body = WR;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// SHOW 1 WAITING ROOM
router.get('waitingrooms.show', '/:waitingroomId', async (ctx) => {
  try {
    const waitingRoom = await ctx.orm.WaitingRoom.findByPk(ctx.params.waitingroomId, {
      include: [
        { model: ctx.orm.User, as: 'user1', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user2', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user3', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user4', attributes: ['id', 'username', 'email', 'avatar'] },
      ],
    });

    if (!waitingRoom) {
      ctx.throw('Waitingroom no encontrada', 404);
    }

    ctx.body = waitingRoom;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// CREAR WAITING ROOM
router.post('waitingrooms.create', '/', async (ctx) => {
  try {
    const waitingRoom = await ctx.orm.WaitingRoom.create({
      full: false,
      jugadores: 1,
      user_1: ctx.request.body.creatorsId,
      user_2: null,
      user_3: null,
      user_4: null,
      avatar1: 'Pandaiquiri',
      avatar2: 'Aperoar',
      avatar3: 'Drunkey Kong',
      avatar4: 'Linux',
    });

    ctx.status = 201;
    ctx.body = waitingRoom;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// AGREGAR USER A WAITING ROOM
router.post('waitingrooms.update', '/:waitingRoomId/users/:userId', async (ctx) => {
  try {
    const waitingRoom = await ctx.orm.WaitingRoom.findByPk(
      ctx.params.waitingRoomId,
      {
        include: [
          { model: ctx.orm.User, as: 'user1' },
          { model: ctx.orm.User, as: 'user2' },
          { model: ctx.orm.User, as: 'user3' },
          { model: ctx.orm.User, as: 'user4' },
        ],
      },
    );
    if (!waitingRoom) {
      ctx.throw('Sala de espera no encontrada', 404);
    }

    const addedUser = await ctx.orm.User.findByPk(ctx.params.userId);
    if (!addedUser) {
      ctx.throw('Usuario no encontrado', 404);
    }

    const user1 = await waitingRoom.getUser1();
    const user2 = await waitingRoom.getUser2();
    const user3 = await waitingRoom.getUser3();
    const user4 = await waitingRoom.getUser4();

    if (user1) {
      if (addedUser.id == user1.id) {
        ctx.throw('Usuario ya está en la sala de espera', 400);
      }
    }
    if (user2) {
      if (addedUser.id == user2.id) {
        ctx.throw('Usuario ya está en la sala de espera', 400);
      }
    }
    if (user3) {
      if (addedUser.id == user3.id) {
        ctx.throw('Usuario ya está en la sala de espera', 400);
      }
    }
    if (user4) {
      if (addedUser.id == user4.id) {
        ctx.throw('Usuario ya está en la sala de espera', 400);
      }
    }

    let readyForMatch = false;

    if (!waitingRoom.full) {
      if (!user1) {
        waitingRoom.user_1 = addedUser.id;
        await waitingRoom.save();
      } else if (!user2) {
        waitingRoom.user_2 = addedUser.id;
        await waitingRoom.save();
      } else if (!user3) {
        waitingRoom.user_3 = addedUser.id;
        await waitingRoom.save();
      } else if (!user4) {
        waitingRoom.user_4 = addedUser.id;
        await waitingRoom.save();
      } else {
        waitingRoom.full = true;
        waitingRoom.jugadores = 4;
        await waitingRoom.save();
        ctx.throw('Sala llena, no puedes entrar', 403);
      }

      const users = [await waitingRoom.getUser1(), await waitingRoom.getUser2(), await waitingRoom.getUser3(), await waitingRoom.getUser4()];
      let count = 0;
      users.forEach((user) => {
        if (user) {
          count += 1;
        }
      });
      waitingRoom.jugadores = count;
      if (count == 4) {
        waitingRoom.full = true;
        readyForMatch = true;
      }
      await waitingRoom.save();
    } else {
      ctx.throw('Sala llena, no puedes entrar', 403);
    }

    const waitingRoom_ = await ctx.orm.WaitingRoom.findByPk(waitingRoom.id, {
      include: [
        { model: ctx.orm.User, as: 'user1', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user2', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user3', attributes: ['id', 'username', 'email', 'avatar'] },
        { model: ctx.orm.User, as: 'user4', attributes: ['id', 'username', 'email', 'avatar'] },
      ],
    });

    ctx.status = 200;
    ctx.body = {
      waitingRoom: waitingRoom_,
      readyForMatch,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// CAMBIAR AVATAR
router.post('waitingrooms.update', '/:waitingRoomId/users/:userId/avatar', async (ctx) => {
  try {
    const waitingRoom = await ctx.orm.WaitingRoom.findByPk(
      ctx.params.waitingRoomId,
      {
        include: [
          { model: ctx.orm.User, as: 'user1', attributes: ['id', 'username', 'email', 'avatar'] },
          { model: ctx.orm.User, as: 'user2', attributes: ['id', 'username', 'email', 'avatar'] },
          { model: ctx.orm.User, as: 'user3', attributes: ['id', 'username', 'email', 'avatar'] },
          { model: ctx.orm.User, as: 'user4', attributes: ['id', 'username', 'email', 'avatar'] },
        ],
      },
    );
    if (!waitingRoom) {
      ctx.throw('Sala de espera no encontrada', 404);
    }

    const avatarUser = await ctx.orm.User.findByPk(ctx.params.userId);
    if (!avatarUser) {
      ctx.throw('Usuario no encontrado', 404);
    }

    const avatar = await ctx.request.body.avatar;

    const user1 = await waitingRoom.getUser1();
    const user2 = await waitingRoom.getUser2();
    const user3 = await waitingRoom.getUser3();
    const user4 = await waitingRoom.getUser4();

    let found = false;
    if (user1) {
      if (avatarUser.id == user1.id) {
        found = true;
        if (avatar != waitingRoom.avatar2 && avatar != waitingRoom.avatar3 && avatar != waitingRoom.avatar4) {
          waitingRoom.avatar1 = await ctx.request.body.avatar;
          await waitingRoom.save();
        } else {
          ctx.throw('Avatar en uso por otro usuario', 403);
        }
      }
    }
    if (user2) {
      if (avatarUser.id == user2.id) {
        found = true;
        if (avatar != waitingRoom.avatar1 && avatar != waitingRoom.avatar3 && avatar != waitingRoom.avatar4) {
          waitingRoom.avatar2 = await ctx.request.body.avatar;
          await waitingRoom.save();
        } else {
          ctx.throw('Avatar en uso por otro usuario', 403);
        }
      }
    }
    if (user3) {
      if (avatarUser.id == user3.id) {
        found = true;
        if (avatar != waitingRoom.avatar2 && avatar != waitingRoom.avatar1 && avatar != waitingRoom.avatar4) {
          waitingRoom.avatar3 = await ctx.request.body.avatar;
          await waitingRoom.save();
        } else {
          ctx.throw('Avatar en uso por otro usuario', 403);
        }
      }
    }
    if (user4) {
      if (avatarUser.id == user4.id) {
        found = true;
        if (avatar != waitingRoom.avatar2 && avatar != waitingRoom.avatar3 && avatar != waitingRoom.avatar1) {
          waitingRoom.avatar4 = await ctx.request.body.avatar;
          await waitingRoom.save();
        } else {
          ctx.throw('Avatar en uso por otro usuario', 403);
        }
      }
    }
    if (!found) {
      ctx.throw('Usuario no está en esta Sala', 403);
    }

    ctx.body = waitingRoom;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
