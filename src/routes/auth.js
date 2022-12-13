const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = new Router();

// LOGIN USER
router.post('/login', async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({
      where: { email: ctx.request.body.email },
      include: [
        { model: ctx.orm.Player, attributes: ['id'] },
      ],
    });

    if (user) {
      if (await bcrypt.compare(ctx.request.body.password, user.password)) {
        const new_session = await ctx.orm.Session.create({
          userId: user.id,
          adminId: null,
        });

        ctx.session.sessionId = new_session.id;

        payload = { id: user.id, rol: 'User' };
        const token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

        ctx.response.body = { token };

        ctx.status = 201;
      } else {
        ctx.throw('Contraseña incorrecta', 401);
      }
    } else {
      ctx.throw('Usuario con ese email no existe', 404);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// SIGNUP USER
router.post('users.create', '/signup', async (ctx) => {
  try {
    const hash_contrasena = await bcrypt.hash(ctx.request.body.password, 5);
    const user_same_email = await ctx.orm.User.findOne({
      where: { email: ctx.request.body.email },
    });
    const user_same_username = await ctx.orm.User.findOne({
      where: { username: ctx.request.body.username },
    });
    if (!user_same_email) {
      if (!user_same_username) {
        const user = await ctx.orm.User.create({
          username: ctx.request.body.username,
          password: hash_contrasena,
          email: ctx.request.body.email,
          avatar: ctx.request.body.avatar,
        });
      } else {
        ctx.throw('Nombre de usuario ya esta ocupado', 401);
      }
    } else {
      ctx.throw('Email ya tiene un usuario asociado', 401);
    }

    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// LOGOUT USER
router.get('/logout', async (ctx) => {
  try {
    await ctx.orm.Session.destroy({
      where: { id: `${ctx.session.sessionId}` },
    });

    ctx.session.sessionId = undefined;

    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// LOGIN ADMIN
router.post('/loginAdmin', async (ctx) => {
  try {
    const admin = await ctx.orm.Admin.findOne({
      where: { email: ctx.request.body.email },
    });

    if (admin) {
      if (await bcrypt.compare(ctx.request.body.password, admin.password)) {
        const new_session = await ctx.orm.Session.create({
          adminId: admin.id,
          userId: null,
        });

        ctx.session.sessionId = new_session.id;
        // const users = await ctx.orm.User.findAll();
        // const players = await ctx.orm.Player.findAll();

        payload = { id: admin.id, rol: 'Admin' };
        const token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

        ctx.response.body = { token };

        ctx.status = 201;
      } else {
        ctx.throw('Contraseña incorrecta', 401);
      }
    } else {
      ctx.throw('Admin con ese email no existe', 404);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// LOGOUT ADMIN
router.get('/logoutAdmin', async (ctx) => {
  try {
    await ctx.orm.Session.destroy({
      where: { id: `${ctx.session.sessionId}` },
    });

    ctx.session.sessionId = undefined;

    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
