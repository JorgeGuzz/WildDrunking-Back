const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const session = require('koa-session');
const jwt = require('koa-jwt');
const router = require('./routes');
const orm = require('./models/index'); // no pone index en DCCat Api

const protected_router = require('./routes/protected');

const app = new Koa();

// Atach Sequelize ORM to the context of the App
app.context.orm = orm;

app.use(cors(({ credentials: true })));

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

// app.keys = [`${process.env.APP_KEYS}`];
app.keys = [`${process.env.SECRET_KEY}`];

const CONFIG = {
  httpOnly: false,
};
app.use(session(CONFIG, app));

app.use(router.routes());

app.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

app.use(protected_router.routes());

module.exports = app;
