const Router = require('koa-router');
const auth_middle = require('./middleware/auth');
const matches = require('./routes/matches');
const users = require('./routes/users');
const players = require('./routes/players');
const admins = require('./routes/admins');
const waitingrooms = require('./routes/waitingrooms');
const shots = require('./routes/shots');
const auth = require('./routes/auth');
const { routes } = require('./routes/players');
// const protected = require('./routes/protected');
// const jwt = require('koa-jwt');

const router = new Router();

router.use('/auth', auth.routes());

router.use('/matches', auth_middle, matches.routes());
router.use('/users', auth_middle, users.routes());
router.use('/players', auth_middle, players.routes());
router.use('/admins', auth_middle, admins.routes());
router.use('/waitingrooms', auth_middle, waitingrooms.routes());
router.use('/shots', auth_middle, shots.routes());

// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

// router.use(protected.routes());

module.exports = router;
