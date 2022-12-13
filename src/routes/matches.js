const Router = require('koa-router');
const { Op } = require('sequelize');
const player = require('../models/player');

const router = new Router();

// GET all matches
router.get('matches.show', '/', async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findAll({
      include: [
        { model: ctx.orm.Player, as: 'player1' },
        { model: ctx.orm.Player, as: 'player2' },
        { model: ctx.orm.Player, as: 'player3' },
        { model: ctx.orm.Player, as: 'player4' },
      ],
    });

    ctx.body = matches;
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// GET usuario, turno e ids usuarios de la partida
router.get('matches.show', '/:id/players/:playerId/info', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw(404);
    }
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const player3 = await match.getPlayer3();
    const player4 = await match.getPlayer4();
    // const playermatches = await match.getPlayerMatches();
    if (![player1.id, player2.id, player3.id, player4.id].includes(requestPlayer.id)) {
      ctx.throw('No tienes permiso para acceder al tablero', 403);
    }

    ctx.body = {
      current: match.current,
      turno: match.turno,
      player1,
      player2,
      player3,
      player4,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

/* // Si es el turno del jugador, lanza el dado -> YA NO LO USAMOS
router.get('matches.show', '/:id/players/:playerId/dado', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw(404);
    }
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const turno = await match.turno;
    if (!(turno == (requestPlayer.id))) {
      ctx.throw('No es tu turno, no puedes lanzar el dado', 403);
    }
    const dado = Math.floor(Math.random() * 5) + 1;
    ctx.body = {
      dado,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
}); */

// Cambia el turno del jugador en la bdd / finalizar turno
router.post('matches.show', '/:id/players/:playerId/turno', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw('Match no encontrada', 404);
    }

    const player1 = await match.player1;
    const player2 = await match.player2;
    const player3 = await match.player3;
    const player4 = await match.player4;
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const turno = await match.turno_player;
    if (!(turno == (requestPlayer.id))) {
      ctx.throw('No es tu turno todavía!', 403);
    }
    if (match.subjugada != 'post_casilla') {
      ctx.throw('Debes terminar de jugar antes de terminar tu turno. Subjugada incorrecta', 403);
    }

    if (turno == player1.id) {
      match.turno_player = player2.id;
      await match.save();
    } else if (turno == player2.id) {
      match.turno_player = player3.id;
      await match.save();
    } else if (turno == player3.id) {
      match.turno_player = player4.id;
      await match.save();
    } else if (turno == player4.id) {
      match.turno_player = player1.id;
      match.turno += 1;
      await match.save();
    }
    match.subjugada = 'init';

    let nCocteles1 = 0;
    let nCocteles2 = 0;
    let nCocteles3 = 0;
    let nCocteles4 = 0;

    if (player1.best_in_show) {
      nCocteles1 += 1;
    }
    if (player1.daiquiri_frutilla) {
      nCocteles1 += 1;
    }
    if (player1.margarita_frutilla) {
      nCocteles1 += 1;
    }
    if (player1.tequila_sunrise) {
      nCocteles1 += 1;
    }
    if (player1.pina_colada) {
      nCocteles1 += 1;
    }
    if (player1.primavera) {
      nCocteles1 += 1;
    }
    if (player1.pina_caipirina) {
      nCocteles1 += 1;
    }

    if (player2.best_in_show) {
      nCocteles2 += 1;
    }
    if (player2.daiquiri_frutilla) {
      nCocteles2 += 1;
    }
    if (player2.margarita_frutilla) {
      nCocteles2 += 1;
    }
    if (player2.tequila_sunrise) {
      nCocteles2 += 1;
    }
    if (player2.pina_colada) {
      nCocteles2 += 1;
    }
    if (player2.primavera) {
      nCocteles2 += 1;
    }
    if (player2.pina_caipirina) {
      nCocteles2 += 1;
    }

    if (player3.best_in_show) {
      nCocteles3 += 1;
    }
    if (player3.daiquiri_frutilla) {
      nCocteles3 += 1;
    }
    if (player3.margarita_frutilla) {
      nCocteles3 += 1;
    }
    if (player3.tequila_sunrise) {
      nCocteles3 += 1;
    }
    if (player3.pina_colada) {
      nCocteles3 += 1;
    }
    if (player3.primavera) {
      nCocteles3 += 1;
    }
    if (player3.pina_caipirina) {
      nCocteles3 += 1;
    }

    if (player4.best_in_show) {
      nCocteles4 += 1;
    }
    if (player4.daiquiri_frutilla) {
      nCocteles4 += 1;
    }
    if (player4.margarita_frutilla) {
      nCocteles4 += 1;
    }
    if (player4.tequila_sunrise) {
      nCocteles4 += 1;
    }
    if (player4.pina_colada) {
      nCocteles4 += 1;
    }
    if (player4.primavera) {
      nCocteles4 += 1;
    }
    if (player4.pina_caipirina) {
      nCocteles4 += 1;
    }

    if (nCocteles1 >= 3 && nCocteles1 >= nCocteles2 && nCocteles1 >= nCocteles3 && nCocteles1 >= nCocteles4) {
      match.ganador = player1.id;
      match.status = 'finished';
      match.subjugada = 'FIN';
      await match.save();
    } else if (nCocteles2 >= 3 && nCocteles2 >= nCocteles1 && nCocteles2 >= nCocteles3 && nCocteles2 >= nCocteles4) {
      match.ganador = player2.id;
      match.status = 'finished';
      match.subjugada = 'FIN';
      await match.save();
    } else if (nCocteles3 >= 3 && nCocteles3 >= nCocteles2 && nCocteles3 >= nCocteles1 && nCocteles3 >= nCocteles4) {
      match.ganador = player3.id;
      match.status = 'finished';
      match.subjugada = 'FIN';
      await match.save();
    } else if (nCocteles4 >= 3 && nCocteles4 >= nCocteles2 && nCocteles4 >= nCocteles3 && nCocteles4 >= nCocteles1) {
      match.ganador = player4.id;
      match.status = 'finished';
      match.subjugada = 'FIN';
      await match.save();
    } else {
      match.ganador = null;
      match.status = 'ongoing';
      await match.save();
    }

    ctx.body = {
      ganador: match.ganador,
      status: match.status,
      playerId: requestPlayer.id,
      oldTurnoPlayer: turno,
      newTurnoPlayer: match.turno_player,
      currentTurnoRonda: match.turno,
      match,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// GET más información de la partida (hexagons, squares, playervertex, ademas de la info normal de un match)
router.get('matches.show', '/:id/players/:playerId/masinfo', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
          { model: ctx.orm.Hexagon },
        ],
      },
    );
    if (!match) {
      ctx.throw(404);
    }
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const player3 = await match.getPlayer3();
    const player4 = await match.getPlayer4();
    if (![player1.id, player2.id, player3.id, player4.id].includes(requestPlayer.id)) {
      ctx.throw('No tienes permiso para acceder al tablero', 403);
    }

    const hexagons = await ctx.orm.Hexagon.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'matchId'] },
      where: {
        matchId: match.id,
      },
      include: [
        { model: ctx.orm.Square },
      ],
    });

    const vertexPlayer1 = await ctx.orm.Vertex.findOne({
      attributes: ['id', 'position', 'playerId'],
      where: {
        playerId: player1.id,
      },
    });
    const vertexPlayer2 = await ctx.orm.Vertex.findOne({
      attributes: ['id', 'position', 'playerId'],
      where: {
        playerId: player2.id,
      },
    });
    const vertexPlayer3 = await ctx.orm.Vertex.findOne({
      attributes: ['id', 'position', 'playerId'],
      where: {
        playerId: player3.id,
      },
    });
    const vertexPlayer4 = await ctx.orm.Vertex.findOne({
      attributes: ['id', 'position', 'playerId'],
      where: {
        playerId: player4.id,
      },
    });

    const player1_ = await ctx.orm.Player.findByPk(player1.id, {
      include: [
        { model: ctx.orm.Shot, as: 'shot1' },
        { model: ctx.orm.Shot, as: 'shot2' },
        { model: ctx.orm.Shot, as: 'shot3' },
      ],
    });
    const player2_ = await ctx.orm.Player.findByPk(player2.id, {
      include: [
        { model: ctx.orm.Shot, as: 'shot1' },
        { model: ctx.orm.Shot, as: 'shot2' },
        { model: ctx.orm.Shot, as: 'shot3' },
      ],
    });
    const player3_ = await ctx.orm.Player.findByPk(player3.id, {
      include: [
        { model: ctx.orm.Shot, as: 'shot1' },
        { model: ctx.orm.Shot, as: 'shot2' },
        { model: ctx.orm.Shot, as: 'shot3' },
      ],
    });
    const player4_ = await ctx.orm.Player.findByPk(player4.id, {
      include: [
        { model: ctx.orm.Shot, as: 'shot1' },
        { model: ctx.orm.Shot, as: 'shot2' },
        { model: ctx.orm.Shot, as: 'shot3' },
      ],
    });

    let s11 = { name: null };
    let s12 = { name: null };
    let s13 = { name: null };
    let s21 = { name: null };
    let s22 = { name: null };
    let s23 = { name: null };
    let s31 = { name: null };
    let s32 = { name: null };
    let s33 = { name: null };
    let s41 = { name: null };
    let s42 = { name: null };
    let s43 = { name: null };

    if (player1.shot_1) {
      s11 = await player1_.getShot1();
    } else {
      s11 = { name: null };
    }
    if (player1.shot_2) {
      s12 = await player1_.getShot2();
    } else {
      s12 = { name: null };
    }
    if (player1.shot_3) {
      s13 = await player1_.getShot3();
    } else {
      s13 = { name: null };
    }
    if (player2.shot_1) {
      s21 = await player2_.getShot1();
    } else {
      s21 = { name: null };
    }
    if (player2.shot_2) {
      s22 = await player2_.getShot2();
    } else {
      s22 = { name: null };
    }
    if (player2.shot_3) {
      s23 = await player2_.getShot3();
    } else {
      s23 = { name: null };
    }
    if (player3.shot_1) {
      s31 = await player3_.getShot1();
    } else {
      s31 = { name: null };
    }
    if (player3.shot_2) {
      s32 = await player3_.getShot2();
    } else {
      s32 = { name: null };
    }
    if (player3.shot_3) {
      s33 = await player3_.getShot3();
    } else {
      s33 = { name: null };
    }
    if (player4.shot_1) {
      s41 = await player4_.getShot1();
    } else {
      s41 = { name: null };
    }
    if (player4.shot_2) {
      s42 = await player4_.getShot2();
    } else {
      s42 = { name: null };
    }
    if (player4.shot_3) {
      s43 = await player4_.getShot3();
    } else {
      s43 = { name: null };
    }

    ctx.body = {
      current: match.current,
      turno: match.turno,
      turno_player: match.turno_player,
      numero_turnos: match.numero_turnos,
      ganador: match.ganador,
      tiempo_jugada: match.tiempo_jugada,

      player1: {
        id: player1.id,
        numero: player1.numero,
        pina: player1.pina,
        naranja: player1.naranja,
        limon: player1.limon,
        frutilla: player1.frutilla,
        personaje: player1.personaje,
        nivel_alcohol: player1.nivel_alcohol,
        best_in_show: player1.best_in_show,
        daiquiri_frutilla: player1.daiquiri_frutilla,
        margarita_frutilla: player1.margarita_frutilla,
        tequila_sunrise: player1.tequila_sunrise,
        pina_colada: player1.pina_colada,
        primavera: player1.primavera,
        pina_caipirina: player1.pina_caipirina,
        createdAt: player1.createdAt,
        updatedAt: player1.updatedAt,
        userId: player1.userId,
        shot_1: player1.shot_1,
        shot_2: player1.shot_2,
        shot_3: player1.shot_3,
        shot1: s11.name,
        shot2: s12.name,
        shot3: s13.name,
      },
      vertexPlayer1,

      player2: {
        id: player2.id,
        numero: player2.numero,
        pina: player2.pina,
        naranja: player2.naranja,
        limon: player2.limon,
        frutilla: player2.frutilla,
        personaje: player2.personaje,
        nivel_alcohol: player2.nivel_alcohol,
        best_in_show: player2.best_in_show,
        daiquiri_frutilla: player2.daiquiri_frutilla,
        margarita_frutilla: player2.margarita_frutilla,
        tequila_sunrise: player2.tequila_sunrise,
        pina_colada: player2.pina_colada,
        primavera: player2.primavera,
        pina_caipirina: player2.pina_caipirina,
        createdAt: player2.createdAt,
        updatedAt: player2.updatedAt,
        userId: player2.userId,
        shot_1: player2.shot_1,
        shot_2: player2.shot_2,
        shot_3: player2.shot_3,
        shot1: s21.name,
        shot2: s22.name,
        shot3: s23.name,
      },
      vertexPlayer2,

      player3: {
        id: player3.id,
        numero: player3.numero,
        pina: player3.pina,
        naranja: player3.naranja,
        limon: player3.limon,
        frutilla: player3.frutilla,
        personaje: player3.personaje,
        nivel_alcohol: player3.nivel_alcohol,
        best_in_show: player3.best_in_show,
        daiquiri_frutilla: player3.daiquiri_frutilla,
        margarita_frutilla: player3.margarita_frutilla,
        tequila_sunrise: player3.tequila_sunrise,
        pina_colada: player3.pina_colada,
        primavera: player3.primavera,
        pina_caipirina: player3.pina_caipirina,
        createdAt: player3.createdAt,
        updatedAt: player3.updatedAt,
        userId: player3.userId,
        shot_1: player3.shot_1,
        shot_2: player3.shot_2,
        shot_3: player3.shot_3,
        shot1: s31.name,
        shot2: s32.name,
        shot3: s33.name,
      },
      vertexPlayer3,

      player4: {
        id: player4.id,
        numero: player4.numero,
        pina: player4.pina,
        naranja: player4.naranja,
        limon: player4.limon,
        frutilla: player4.frutilla,
        personaje: player4.personaje,
        nivel_alcohol: player4.nivel_alcohol,
        best_in_show: player4.best_in_show,
        daiquiri_frutilla: player4.daiquiri_frutilla,
        margarita_frutilla: player4.margarita_frutilla,
        tequila_sunrise: player4.tequila_sunrise,
        pina_colada: player4.pina_colada,
        primavera: player4.primavera,
        pina_caipirina: player4.pina_caipirina,
        createdAt: player4.createdAt,
        updatedAt: player4.updatedAt,
        userId: player4.userId,
        shot_1: player4.shot_1,
        shot_2: player4.shot_2,
        shot_3: player4.shot_3,
        shot1: s41.name,
        shot2: s42.name,
        shot3: s43.name,
      },
      vertexPlayer4,

      hexagons,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// Cambiar estado de la partida en la bdd (finished / ongoing)
router.post('matches.show', '/:id/players/:playerId/estado', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw(404);
    }
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const player3 = await match.getPlayer3();
    const player4 = await match.getPlayer4();

    if (![player1.id, player2.id, player3.id, player4.id].includes(requestPlayer.id)) {
      ctx.throw('No tienes permiso para acceder al tablero', 403);
    }

    if (match.status == 'finished') {
      match.status = 'ongoing';
      match.ganador = null;
    } else {
      match.status = 'finished';
      match.ganador = requestPlayer.id;
    }
    await match.save();

    ctx.body = {
      current: match.current,
      turno: match.turno,
      turno_player: match.turno_player,
      numero_turnos: match.numero_turnos,
      tiempo_jugada: match.tiempo_jugada,
      status: match.status,
      ganador: match.ganador,
      id_player1: player1,
      id_player2: player2,
      id_player3: player3,
      id_player4: player4,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// GET casilla en [ID] hexágono
router.get('matches.show', '/:id/hexagons/:hexagonId', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    if (!match) {
      ctx.throw(404);
    }

    const hexagon = await ctx.orm.Hexagon.findByPk(ctx.params.hexagonId, {
      include: [
        { model: ctx.orm.Square },
      ],
    });
    if (!hexagon) {
      ctx.throw('Hexagono no encontrado', 404);
    }

    const square = await hexagon.getSquare();
    if (!square) {
      ctx.throw('Casilla no encontrada', 404);
    }

    ctx.body = {
      hexagonId: hexagon.id,
      hexagonPosition: hexagon.position,
      casillaId: square.id,
      casillaTipo: square.tipo,
      casillaName: square.name,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// POST cambiar casilla de [ID] hexágono
router.post('matches.show', '/:id/hexagons/:hexagonId/squares/:squareId', async (ctx) => {
  try {
    const hexagon = await ctx.orm.Hexagon.findByPk(ctx.params.hexagonId, {
      include: [
        { model: ctx.orm.Square },
      ],
    });
    const nueva_casilla = await ctx.orm.Square.findByPk(ctx.params.squareId);
    const old_casilla = await hexagon.getSquare();

    hexagon.squareId = nueva_casilla.id;
    hexagon.save();

    ctx.body = {
      hexagonId: hexagon.id,
      hexagonPosition: hexagon.position,
      oldSquareId: old_casilla.id,
      oldSquareName: old_casilla.name,
      oldSquareTipo: old_casilla.tipo,
      newSquareId: nueva_casilla.id,
      newSquareName: nueva_casilla.name,
      newSquareTipo: nueva_casilla.tipo,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

// GET vértices vecinos de [ID] vértice
router.get('matches.show', '/:id/vertices/:vertexId', async (ctx) => {
  try {
    const vertex = await ctx.orm.Vertex.findByPk(ctx.params.vertexId, {
      include: [
        { model: ctx.orm.VertexVertex, as: 'vertices' },
        { model: ctx.orm.VertexVertex, as: 'vecinos' },
      ],
    });

    const vertexvertex = await ctx.orm.VertexVertex.findAll({
      attributes: ['id', 'vertexId', 'vecinoId'],
      where: {
        vertexId: vertex.id,
      },
    });

    const vecinos = [];

    for (const vv of vertexvertex) {
      vecinos.push({
        vecino: await ctx.orm.Vertex.findByPk(vv.vecinoId),
      });
    }

    ctx.body = {
      vertexId: vertex.id,
      vertexPosition: vertex.position,
      vertexvertex,
      vecinos,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// POST player add shot (comprar shot)
router.post('matches.update', '/:id/player/:playerId/shot/:shotId', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw('Partida no encontrada', 404);
    }

    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const player3 = await match.getPlayer3();
    const player4 = await match.getPlayer4();

    if (![player1.id, player2.id, player3.id, player4.id].includes(requestPlayer.id)) {
      ctx.throw('Jugador no pertenece a esta partida', 403);
    }

    const shot = await ctx.orm.Shot.findByPk(ctx.params.shotId);
    const payment = await ctx.request.body.payment;

    if (!requestPlayer.shot_1) {
      requestPlayer.shot_1 = shot.id;
      await requestPlayer.save();
    } else if (!requestPlayer.shot_2) {
      requestPlayer.shot_2 = shot.id;
      await requestPlayer.save();
    } else if (!requestPlayer.shot_3) {
      requestPlayer.shot_3 = shot.id;
      await requestPlayer.save();
    } else {
      ctx.throw('¡Ya tienes 3 shots! No puedes agregar otro', 403);
    }

    if (payment == 'pina') {
      if (requestPlayer.pina < shot.price) {
        ctx.throw('No tienes piñas suficientes', 403);
      } else {
        requestPlayer.pina -= shot.price;
      }
    } else if (payment == 'naranja') {
      if (requestPlayer.naranja < shot.price) {
        ctx.throw('No tienes naranjas suficientes', 403);
      } else {
        requestPlayer.naranja -= shot.price;
      }
    } else if (payment == 'frutilla') {
      if (requestPlayer.frutilla < shot.price) {
        ctx.throw('No tienes frutillas suficientes', 403);
      } else {
        requestPlayer.frutilla -= shot.price;
      }
    } else if (payment == 'limon') {
      if (requestPlayer.limon < shot.price) {
        ctx.throw('No tienes limones suficientes', 403);
      } else {
        requestPlayer.limon -= shot.price;
      }
    } else {
      ctx.throw('Fruta no válida', 403);
    }

    ctx.body = {
      player: requestPlayer,
      shotAdded: shot,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// POST Drink shot
router.post('matches.update', '/:id/player/:playerId/drinkShot', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Player, as: 'player3' },
          { model: ctx.orm.Player, as: 'player4' },
        ],
      },
    );
    if (!match) {
      ctx.throw('Partida no encontrada', 404);
    }
    if (match.subjugada != 'init') {
      if (match.subjugada == 'FIN') {
        ctx.throw('No puedes jugar porque ya finalizó la partida.', 403);
      }
      ctx.throw('No puedes tomar un shot ahora! Subjugada incorrecta', 403);
    }

    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const player3 = await match.getPlayer3();
    const player4 = await match.getPlayer4();

    if (match.turno_player != requestPlayer.id) {
      ctx.throw('No es tu turno!', 403);
    }

    if (![player1.id, player2.id, player3.id, player4.id].includes(requestPlayer.id)) {
      ctx.throw('Jugador no pertenece a esta partida', 403);
    }

    const shot = await ctx.orm.Shot.findOne({
      where: {
        name: ctx.request.body.shotName,
      },
    });
    if (!shot) {
      ctx.throw('Shot no encontrado', 404);
    }

    const nivelAlcoholAntes = requestPlayer.nivel_alcohol;

    if (requestPlayer.shot_1 == shot.id) {
      // -0.5 nivel de alcohol
      if (shot.name == 'agua') {
        if (requestPlayer.nivel_alcohol > 0.5) {
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol - 0.5) * 10) / 10;
        } else {
          requestPlayer.nivel_alcohol = 0.0;
        }
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'agua',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'gatorade') {
        // nivel de alcohol / 2
        requestPlayer.nivel_alcohol = Math.round((nivelAlcoholAntes / 2) * 10) / 10;
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'gatorade',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'viNoLoQuiero') {
        // DESCARTAR CASILLA

        const casillaMala = await ctx.orm.Square.findOne({
          where: {
            name: ctx.request.body.casillaMala,
          },
        });
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });

        const posibleHexagons = await vertexPlayer.getHexagons();
        var hex_array = [];
        posibleHexagons.forEach((hex) => {
          hex_array.push(hex);
        });

        var posiblesCasillas = [];
        for (let i = 0; i < hex_array.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(hex_array[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        if (posiblesCasillas.includes(casillaMala.id)) {
          const index = posiblesCasillas.indexOf(casillaMala.id);
          posiblesCasillas.splice(index, 1);
          const casillaEscogida_ = posiblesCasillas[Math.floor(Math.random() * posiblesCasillas.length)];
          const casillaEscogida = await ctx.orm.Square.findByPk(casillaEscogida_);
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_1 = null;
          await requestPlayer.save();
          match.subjugada = 'post_movimiento';
          await match.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < hex_array.length[k]; k++) {
            if (hex_array[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(hex_array[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'viNoLoQuiero',
            nivelAlcoholAntes,
            nivelAlcoholAhora: requestPlayer.nivel_alcohol,
            casillaBloqueada: casillaMala,
            casillaEscogida,
            hexagonoEscogido,
            player: requestPlayer,
            shot,
            match,
          };
        } else {
          ctx.throw('Casilla enviada no se encuentra dentro de las disponibles', 403);
        }
      } else if (shot.name == 'eleGin') {
        // ELEGIR CASILLA
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });
        const posibleHexagons = await vertexPlayer.getHexagons();

        var posiblesCasillas = [];
        for (let i = 0; i < posibleHexagons.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(posibleHexagons[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        const casillaEscogida = await ctx.orm.Square.findOne({
          where: { name: ctx.request.body.casillaEscogida },
        });

        if (posiblesCasillas.includes(casillaEscogida.id)) {
          match.subjugada = 'post_movimiento';
          await match.save();
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_1 = null;
          await requestPlayer.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < posibleHexagons.length[k]; k++) {
            if (posibleHexagons[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(posibleHexagons[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'eleGin',
            casillaEscogida,
            hexagonoEscogido,
            match,
            player: requestPlayer,
          };
        } else {
          ctx.throw('Casilla escogida no está dentro de las posibles', 403);
        }
      } else if (shot.name == 'aguardiente') {
        // SUBIR NIVEL ALCOHOL 25% A RIVAL
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        rival.nivel_alcohol = Math.round((rival.nivel_alcohol * 1.25) * 10) / 10;
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'aguardiente',
          rival,
          player: requestPlayer,
          match,
        };
      } else if (shot.name == 'vodKambia') {
        // CAMBIA LUGAR CON OTRO JUGADOR
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
        });
        const oldPV = vertexPlayer.id;

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];

        const vertexRival = await ctx.orm.Vertex.findOne({
          where: {
            playerId: rival.id,
          },
        });
        if (!vertexRival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const oldRV = vertexRival.id;

        vertexPlayer.playerId = rival.id;
        vertexRival.playerId = requestPlayer.id;
        await vertexPlayer.save();
        await vertexRival.save();

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'vodKambia',
          oldPlayerVertex: oldPV,
          oldRivalVertex: oldRV,
          newPlayerVertex: vertexPlayer,
          newRivalVertex: vertexRival,
          match,
        };
      } else if (shot.name == 'tequilaZorro') {
        // QUITA 3 FRUTAS A OTRO JUGADOR
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        console.log(rival);
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const frutas = ['pina', 'naranja', 'frutilla', 'limon'];
        for (let i = frutas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [frutas[i], frutas[j]] = [frutas[j], frutas[i]];
        }
        let pinas = 0;
        let naranjas = 0;
        let frutillas = 0;
        let limones = 0;
        let robar = 3;
        let frutasRival = rival.pina + rival.naranja + rival.frutilla + rival.limon;
        while (robar > 0 && frutasRival > 0) {
          const fruta1 = frutas.shift();
          if (fruta1 == 'pina' && rival.pina > 0) {
            robar -= 1;
            frutasRival -= 1;
            pinas += 1;
            rival.pina -= 1;
            requestPlayer.pina += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'naranja' && rival.naranja > 0) {
            robar -= 1;
            frutasRival -= 1;
            naranjas += 1;
            rival.naranja -= 1;
            requestPlayer.naranja += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'frutilla' && rival.frutilla > 0) {
            robar -= 1;
            frutasRival -= 1;
            frutillas += 1;
            rival.frutilla -= 1;
            requestPlayer.frutilla += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'limon' && rival.limon > 0) {
            robar -= 1;
            frutasRival -= 1;
            limones += 1;
            rival.limon -= 1;
            requestPlayer.limon += 1;
            await rival.save();
            await requestPlayer.save();
          }
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'tequilaZorro',
          pinasRobadas: pinas,
          naranjasRobadas: naranjas,
          limonesRobados: limones,
          frutillasRobadas: frutillas,
          requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'intercambiaRon') {
        const rival = await ctx.orm.Player.findByPk(ctx.request.body.rivalId);
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const fruta = await ctx.request.body.tipoFruta;

        if (fruta == 'pina') {
          if (rival.pina > 5) {
            const cambio = 5;
            rival.pina -= 5;
            requestPlayer.pina += 5;
          } else {
            const cambio = rival.pina;
            rival.pina = 0;
            requestPlayer.pina += cambio;
          }
        } else if (fruta == 'naranja') {
          if (rival.naranja > 5) {
            const cambio = 5;
            rival.naranja -= 5;
            requestPlayer.naranja += 5;
          } else {
            const cambio = rival.naranja;
            rival.naranja = 0;
            requestPlayer.naranja += cambio;
          }
        } else if (fruta == 'frutilla') {
          if (rival.frutilla > 5) {
            const cambio = 5;
            rival.frutilla -= 5;
            requestPlayer.frutilla += 5;
          } else {
            const cambio = rival.frutilla;
            rival.frutilla = 0;
            requestPlayer.frutilla += cambio;
          }
        } else if (fruta == 'limon') {
          if (rival.limon > 5) {
            const cambio = 5;
            rival.limon -= 5;
            requestPlayer.limon += 5;
          } else {
            const cambio = rival.limon;
            rival.limon = 0;
            requestPlayer.limon += cambio;
          }
        } else {
          ctx.throw('Tipo de fruta ingresado no existe', 403);
        }
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_1 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'intercambiaRon',
          tipoFruta: fruta,
          frutasCambiadas: cambio,
          player: requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'pisCoperaste') {
        // ROBAR SHOT A OTRO

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival__ = others[r];

        const rival = await ctx.orm.Player.findByPk(rival__.id, {
          include: [{ model: ctx.orm.Shot, as: 'shot1' },
            { model: ctx.orm.Shot, as: 'shot2' },
            { model: ctx.orm.Shot, as: 'shot3' }],
        });
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        const shot1R = await rival.getShot1();
        const shot2R = await rival.getShot2();
        const shot3R = await rival.getShot3();
        const shotsId = [];
        if (shot1R) {
          shotsId.push(shot1R.id);
        }
        if (shot2R) {
          shotsId.push(shot2R.id);
        }
        if (shot3R) {
          shotsId.push(shot3R.id);
        }
        if (!shot1R && !shot2R && !shot3R) {
          requestPlayer.shot_1 = null;
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          await requestPlayer.save();
          match.subjugada = 'post_shot';
          await match.save();
          ctx.throw('¡Oh, mala suerte! Rival no posee shots!', 403);
        }

        if (rival.shot_1) {
          requestPlayer.shot_1 = rival.shot_1;
          rival.shot_1 = null;
          await rival.save();
        } else if (rival.shot_2) {
          requestPlayer.shot_1 = rival.shot_2;
          rival.shot_2 = null;
          await rival.save();
        } else if (rival.shot_3) {
          requestPlayer.shot_1 = rival.shot_3;
          rival.shot_3 = null;
          await rival.save();
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'pisCoperaste',
          player: requestPlayer,
          rival,
          match,
        };
      }
    } else if (requestPlayer.shot_2 == shot.id) { // HACER LO MISMO
      // -0.5 nivel de alcohol
      if (shot.name == 'agua') {
        if (requestPlayer.nivel_alcohol > 0.5) {
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol - 0.5) * 10) / 10;
        } else {
          requestPlayer.nivel_alcohol = 0.0;
        }
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'agua',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'gatorade') {
        // nivel de alcohol / 2
        requestPlayer.nivel_alcohol = Math.round((nivelAlcoholAntes / 2) * 10) / 10;
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'gatorade',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'viNoLoQuiero') {
        // DESCARTAR CASILLA

        const casillaMala = await ctx.orm.Square.findOne({
          where: {
            name: ctx.request.body.casillaMala,
          },
        });
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });

        const posibleHexagons = await vertexPlayer.getHexagons();
        var hex_array = [];
        posibleHexagons.forEach((hex) => {
          hex_array.push(hex);
        });

        var posiblesCasillas = [];
        for (let i = 0; i < hex_array.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(hex_array[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        if (posiblesCasillas.includes(casillaMala.id)) {
          const index = posiblesCasillas.indexOf(casillaMala.id);
          posiblesCasillas.splice(index, 1);
          const casillaEscogida_ = posiblesCasillas[Math.floor(Math.random() * posiblesCasillas.length)];
          const casillaEscogida = await ctx.orm.Square.findByPk(casillaEscogida_);
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_2 = null;
          await requestPlayer.save();
          match.subjugada = 'post_movimiento';
          await match.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < hex_array.length[k]; k++) {
            if (hex_array[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(hex_array[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'viNoLoQuiero',
            nivelAlcoholAntes,
            nivelAlcoholAhora: requestPlayer.nivel_alcohol,
            casillaBloqueada: casillaMala,
            casillaEscogida,
            hexagonoEscogido,
            player: requestPlayer,
            shot,
            match,
          };
        } else {
          ctx.throw('Casilla enviada no se encuentra dentro de las disponibles', 403);
        }
      } else if (shot.name == 'eleGin') {
        // ELEGIR CASILLA
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });
        const posibleHexagons = await vertexPlayer.getHexagons();

        var posiblesCasillas = [];
        for (let i = 0; i < posibleHexagons.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(posibleHexagons[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        const casillaEscogida = await ctx.orm.Square.findOne({
          where: { name: ctx.request.body.casillaEscogida },
        });

        if (posiblesCasillas.includes(casillaEscogida.id)) {
          match.subjugada = 'post_movimiento';
          await match.save();
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_2 = null;
          await requestPlayer.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < posibleHexagons.length[k]; k++) {
            if (posibleHexagons[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(posibleHexagons[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'eleGin',
            casillaEscogida,
            hexagonoEscogido,
            match,
            player: requestPlayer,
          };
        } else {
          ctx.throw('Casilla escogida no está dentro de las posibles', 403);
        }
      } else if (shot.name == 'aguardiente') {
        // SUBIR NIVEL ALCOHOL 25% A RIVAL
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        rival.nivel_alcohol = Math.round((rival.nivel_alcohol * 1.25) * 10) / 10;
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'aguardiente',
          rival,
          player: requestPlayer,
          match,
        };
      } else if (shot.name == 'vodKambia') {
        // CAMBIA LUGAR CON OTRO JUGADOR
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
        });
        const oldPV = vertexPlayer.id;

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];

        const vertexRival = await ctx.orm.Vertex.findOne({
          where: {
            playerId: rival.id,
          },
        });
        if (!vertexRival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const oldRV = vertexRival.id;

        vertexPlayer.playerId = rival.id;
        vertexRival.playerId = requestPlayer.id;
        await vertexPlayer.save();
        await vertexRival.save();

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'vodKambia',
          oldPlayerVertex: oldPV,
          oldRivalVertex: oldRV,
          newPlayerVertex: vertexPlayer,
          newRivalVertex: vertexRival,
          match,
        };
      } else if (shot.name == 'tequilaZorro') {
        // QUITA 3 FRUTAS A OTRO JUGADOR
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const frutas = ['pina', 'naranja', 'frutilla', 'limon'];
        for (let i = frutas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [frutas[i], frutas[j]] = [frutas[j], frutas[i]];
        }
        let pinas = 0;
        let naranjas = 0;
        let frutillas = 0;
        let limones = 0;
        let robar = 3;
        let frutasRival = rival.pina + rival.naranja + rival.frutilla + rival.limon;
        while (robar > 0 && frutasRival > 0) {
          const fruta1 = frutas.splice();
          if (fruta1 == 'pina' && rival.pina > 0) {
            robar -= 1;
            frutasRival -= 1;
            pinas += 1;
            rival.pina -= 1;
            requestPlayer.pina += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'naranja' && rival.naranja > 0) {
            robar -= 1;
            frutasRival -= 1;
            naranjas += 1;
            rival.naranja -= 1;
            requestPlayer.naranja += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'frutilla' && rival.frutilla > 0) {
            robar -= 1;
            frutasRival -= 1;
            frutillas += 1;
            rival.frutilla -= 1;
            requestPlayer.frutilla += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'limon' && rival.limon > 0) {
            robar -= 1;
            frutasRival -= 1;
            limones += 1;
            rival.limon -= 1;
            requestPlayer.limon += 1;
            await rival.save();
            await requestPlayer.save();
          }
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'tequilaZorro',
          pinasRobadas: pinas,
          naranjasRobadas: naranjas,
          limonesRobados: limones,
          frutillasRobadas: frutillas,
          requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'intercambiaRon') {
        const rival = await ctx.orm.Player.findByPk(ctx.request.body.rivalId);
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const fruta = await ctx.request.body.tipoFruta;

        if (fruta == 'pina') {
          if (rival.pina > 5) {
            const cambio = 5;
            rival.pina -= 5;
            requestPlayer.pina += 5;
          } else {
            const cambio = rival.pina;
            rival.pina = 0;
            requestPlayer.pina += cambio;
          }
        } else if (fruta == 'naranja') {
          if (rival.naranja > 5) {
            const cambio = 5;
            rival.naranja -= 5;
            requestPlayer.naranja += 5;
          } else {
            const cambio = rival.naranja;
            rival.naranja = 0;
            requestPlayer.naranja += cambio;
          }
        } else if (fruta == 'frutilla') {
          if (rival.frutilla > 5) {
            const cambio = 5;
            rival.frutilla -= 5;
            requestPlayer.frutilla += 5;
          } else {
            const cambio = rival.frutilla;
            rival.frutilla = 0;
            requestPlayer.frutilla += cambio;
          }
        } else if (fruta == 'limon') {
          if (rival.limon > 5) {
            const cambio = 5;
            rival.limon -= 5;
            requestPlayer.limon += 5;
          } else {
            const cambio = rival.limon;
            rival.limon = 0;
            requestPlayer.limon += cambio;
          }
        } else {
          ctx.throw('Tipo de fruta ingresado no existe', 403);
        }
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_2 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'intercambiaRon',
          tipoFruta: fruta,
          frutasCambiadas: cambio,
          player: requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'pisCoperaste') {
        // ROBAR SHOT A OTRO

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival__ = others[r];
        const rival = await ctx.orm.Player.findByPk(rival__.id, {
          include: [{ model: ctx.orm.Shot, as: 'shot1' },
            { model: ctx.orm.Shot, as: 'shot2' },
            { model: ctx.orm.Shot, as: 'shot3' }],
        });
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        const shot1R = await rival.getShot1();
        const shot2R = await rival.getShot2();
        const shot3R = await rival.getShot3();
        const shotsId = [];
        if (shot1R) {
          shotsId.push(shot1R.id);
        }
        if (shot2R) {
          shotsId.push(shot2R.id);
        }
        if (shot3R) {
          shotsId.push(shot3R.id);
        }
        if (!shot1R && !shot2R && !shot3R) {
          requestPlayer.shot_2 = null;
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          await requestPlayer.save();
          match.subjugada = 'post_shot';
          await match.save();
          ctx.throw('¡Oh, mala suerte! Rival no posee shots!', 403);
        }

        if (rival.shot_1) {
          requestPlayer.shot_2 = rival.shot_1;
          rival.shot_1 = null;
          await rival.save();
        } else if (rival.shot_2) {
          requestPlayer.shot_2 = rival.shot_2;
          rival.shot_2 = null;
          await rival.save();
        } else if (rival.shot_3) {
          requestPlayer.shot_2 = rival.shot_3;
          rival.shot_3 = null;
          await rival.save();
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'pisCoperaste',
          player: requestPlayer,
          rival,
          match,
        };
      }
    } else if (requestPlayer.shot_3 == shot.id) { // HACER LO MISMO
      // -0.5 nivel de alcohol
      if (shot.name == 'agua') {
        if (requestPlayer.nivel_alcohol > 0.5) {
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol - 0.5) * 10) / 10;
        } else {
          requestPlayer.nivel_alcohol = 0.0;
        }
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'agua',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'gatorade') {
        // nivel de alcohol / 2
        requestPlayer.nivel_alcohol = Math.round((nivelAlcoholAntes / 2) * 10) / 10;
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'gatorade',
          nivelAlcoholAntes,
          nivelAlcoholAhora: requestPlayer.nivel_alcohol,
          player: requestPlayer,
          shot,
          match,
        };
      } else if (shot.name == 'viNoLoQuiero') {
        // DESCARTAR CASILLA

        const casillaMala = await ctx.orm.Square.findOne({
          where: {
            name: ctx.request.body.casillaMala,
          },
        });
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });

        const posibleHexagons = await vertexPlayer.getHexagons();
        var hex_array = [];
        posibleHexagons.forEach((hex) => {
          hex_array.push(hex);
        });

        var posiblesCasillas = [];
        for (let i = 0; i < hex_array.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(hex_array[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        if (posiblesCasillas.includes(casillaMala.id)) {
          const index = posiblesCasillas.indexOf(casillaMala.id);
          posiblesCasillas.splice(index, 1);
          const casillaEscogida_ = posiblesCasillas[Math.floor(Math.random() * posiblesCasillas.length)];
          const casillaEscogida = await ctx.orm.Square.findByPk(casillaEscogida_);
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_3 = null;
          await requestPlayer.save();
          match.subjugada = 'post_movimiento';
          await match.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < hex_array.length[k]; k++) {
            if (hex_array[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(hex_array[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'viNoLoQuiero',
            nivelAlcoholAntes,
            nivelAlcoholAhora: requestPlayer.nivel_alcohol,
            casillaBloqueada: casillaMala,
            casillaEscogida,
            hexagonoEscogido,
            player: requestPlayer,
            shot,
            match,
          };
        } else {
          ctx.throw('Casilla enviada no se encuentra dentro de las disponibles', 403);
        }
      } else if (shot.name == 'eleGin') {
        // ELEGIR CASILLA
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
          include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
        });
        const posibleHexagons = await vertexPlayer.getHexagons();

        var posiblesCasillas = [];
        for (let i = 0; i < posibleHexagons.length; i++) {
          const hex_ = await ctx.orm.Hexagon.findByPk(posibleHexagons[i].id, {
            include: [{ model: ctx.orm.Square, as: 'Square' }],
          });
          const c = await hex_.getSquare();
          posiblesCasillas.push(c.id);
        }

        const casillaEscogida = await ctx.orm.Square.findOne({
          where: { name: ctx.request.body.casillaEscogida },
        });

        if (posiblesCasillas.includes(casillaEscogida.id)) {
          match.subjugada = 'post_movimiento';
          await match.save();
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_3 = null;
          await requestPlayer.save();

          const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
            where: { playerId: requestPlayer.id },
          });
          for (let j = 0; j < oldGoodH.length; j++) {
            const delete_ = await oldGoodH[j].destroy();
          }
          const hexagonoEscogido = [];
          for (let k = 0; k < posibleHexagons.length[k]; k++) {
            if (posibleHexagons[k].squareId == casillaEscogida.id) {
              hexagonoEscogido.push(posibleHexagons[k]);
              const new_gh = await ctx.orm.GoodPlayerHexagon.create({
                playerId: requestPlayer.id,
                squareId: casillaEscogida.id,
              });
            }
          }

          ctx.body = {
            shot: 'eleGin',
            casillaEscogida,
            hexagonoEscogido,
            match,
            player: requestPlayer,
          };
        } else {
          ctx.throw('Casilla escogida no está dentro de las posibles', 403);
        }
      } else if (shot.name == 'aguardiente') {
        // SUBIR NIVEL ALCOHOL 25% A RIVAL
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        rival.nivel_alcohol = Math.round((rival.nivel_alcohol * 1.25) * 10) / 10;
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'aguardiente',
          rival,
          player: requestPlayer,
          match,
        };
      } else if (shot.name == 'vodKambia') {
        // CAMBIA LUGAR CON OTRO JUGADOR
        const vertexPlayer = await ctx.orm.Vertex.findOne({
          where: {
            playerId: requestPlayer.id,
          },
        });
        const oldPV = vertexPlayer.id;

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];

        const vertexRival = await ctx.orm.Vertex.findOne({
          where: {
            playerId: rival.id,
          },
        });
        if (!vertexRival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const oldRV = vertexRival.id;

        vertexPlayer.playerId = rival.id;
        vertexRival.playerId = requestPlayer.id;
        await vertexPlayer.save();
        await vertexRival.save();

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'vodKambia',
          oldPlayerVertex: oldPV,
          oldRivalVertex: oldRV,
          newPlayerVertex: vertexPlayer,
          newRivalVertex: vertexRival,
          match,
        };
      } else if (shot.name == 'tequilaZorro') {
        // QUITA 3 FRUTAS A OTRO JUGADOR
        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival = others[r];
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const frutas = ['pina', 'naranja', 'frutilla', 'limon'];
        for (let i = frutas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [frutas[i], frutas[j]] = [frutas[j], frutas[i]];
        }
        let pinas = 0;
        let naranjas = 0;
        let frutillas = 0;
        let limones = 0;
        let robar = 3;
        let frutasRival = rival.pina + rival.naranja + rival.frutilla + rival.limon;
        while (robar > 0 && frutasRival > 0) {
          const fruta1 = frutas.splice();
          if (fruta1 == 'pina' && rival.pina > 0) {
            robar -= 1;
            frutasRival -= 1;
            pinas += 1;
            rival.pina -= 1;
            requestPlayer.pina += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'naranja' && rival.naranja > 0) {
            robar -= 1;
            frutasRival -= 1;
            naranjas += 1;
            rival.naranja -= 1;
            requestPlayer.naranja += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'frutilla' && rival.frutilla > 0) {
            robar -= 1;
            frutasRival -= 1;
            frutillas += 1;
            rival.frutilla -= 1;
            requestPlayer.frutilla += 1;
            await rival.save();
            await requestPlayer.save();
          } else if (fruta1 == 'limon' && rival.limon > 0) {
            robar -= 1;
            frutasRival -= 1;
            limones += 1;
            rival.limon -= 1;
            requestPlayer.limon += 1;
            await rival.save();
            await requestPlayer.save();
          }
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'tequilaZorro',
          pinasRobadas: pinas,
          naranjasRobadas: naranjas,
          limonesRobados: limones,
          frutillasRobadas: frutillas,
          requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'intercambiaRon') {
        const rival = await ctx.orm.Player.findByPk(ctx.request.body.rivalId);
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }
        const fruta = await ctx.request.body.tipoFruta;

        if (fruta == 'pina') {
          if (rival.pina > 5) {
            const cambio = 5;
            rival.pina -= 5;
            requestPlayer.pina += 5;
          } else {
            const cambio = rival.pina;
            rival.pina = 0;
            requestPlayer.pina += cambio;
          }
        } else if (fruta == 'naranja') {
          if (rival.naranja > 5) {
            const cambio = 5;
            rival.naranja -= 5;
            requestPlayer.naranja += 5;
          } else {
            const cambio = rival.naranja;
            rival.naranja = 0;
            requestPlayer.naranja += cambio;
          }
        } else if (fruta == 'frutilla') {
          if (rival.frutilla > 5) {
            const cambio = 5;
            rival.frutilla -= 5;
            requestPlayer.frutilla += 5;
          } else {
            const cambio = rival.frutilla;
            rival.frutilla = 0;
            requestPlayer.frutilla += cambio;
          }
        } else if (fruta == 'limon') {
          if (rival.limon > 5) {
            const cambio = 5;
            rival.limon -= 5;
            requestPlayer.limon += 5;
          } else {
            const cambio = rival.limon;
            rival.limon = 0;
            requestPlayer.limon += cambio;
          }
        } else {
          ctx.throw('Tipo de fruta ingresado no existe', 403);
        }
        await rival.save();
        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        requestPlayer.shot_3 = null;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'intercambiaRon',
          tipoFruta: fruta,
          frutasCambiadas: cambio,
          player: requestPlayer,
          rival,
          match,
        };
      } else if (shot.name == 'pisCoperaste') {
        // ROBAR SHOT A OTRO

        const others = [];
        const p1 = await match.getPlayer1();
        const p2 = await match.getPlayer2();
        const p3 = await match.getPlayer3();
        const p4 = await match.getPlayer4();
        if (p1.id != requestPlayer.id) {
          others.push(p1);
        }
        if (p2.id != requestPlayer.id) {
          others.push(p2);
        }
        if (p3.id != requestPlayer.id) {
          others.push(p3);
        }
        if (p4.id != requestPlayer.id) {
          others.push(p4);
        }
        const r = Math.floor(Math.random() * 3);
        const rival__ = others[r];

        const rival = await ctx.orm.Player.findByPk(rival__.id, {
          include: [{ model: ctx.orm.Shot, as: 'shot1' },
            { model: ctx.orm.Shot, as: 'shot2' },
            { model: ctx.orm.Shot, as: 'shot3' }],
        });
        if (!rival) {
          ctx.throw('Rival no encontrado', 404);
        }

        const shot1R = await rival.getShot1();
        const shot2R = await rival.getShot2();
        const shot3R = await rival.getShot3();
        const shotsId = [];
        if (shot1R) {
          shotsId.push(shot1R.id);
        }
        if (shot2R) {
          shotsId.push(shot2R.id);
        }
        if (shot3R) {
          shotsId.push(shot3R.id);
        }
        if (!shot1R && !shot2R && !shot3R) {
          requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
          requestPlayer.shot_3 = null;
          await requestPlayer.save();
          match.subjugada = 'post_shot';
          await match.save();
          ctx.throw('¡Oh, mala suerte! Rival no posee shots!', 403);
        }

        if (rival.shot_1) {
          requestPlayer.shot_3 = rival.shot_1;
          rival.shot_1 = null;
          await rival.save();
        } else if (rival.shot_2) {
          requestPlayer.shot_3 = rival.shot_2;
          rival.shot_2 = null;
          await rival.save();
        } else if (rival.shot_3) {
          requestPlayer.shot_3 = rival.shot_3;
          rival.shot_3 = null;
          await rival.save();
        }

        requestPlayer.nivel_alcohol = Math.round((requestPlayer.nivel_alcohol + 0.1) * 10) / 10;
        await requestPlayer.save();
        match.subjugada = 'post_shot';
        await match.save();

        ctx.body = {
          shot: 'pisCoperaste',
          player: requestPlayer,
          rival,
          match,
        };
      }
    } else {
      ctx.throw('No posees este shot', 403);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// Aplicar efecto casilla
router.post('matches.update', '/:id/players/:playerId/efectoCasilla', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Player, as: 'player1' },
        { model: ctx.orm.Player, as: 'player2' },
        { model: ctx.orm.Player, as: 'player3' },
        { model: ctx.orm.Player, as: 'player4' },
      ],
    });
    if (!match) {
      ctx.throw('Match no encontrada', 404);
    }

    const player = await ctx.orm.Player.findByPk(ctx.params.playerId);
    if (!player) {
      ctx.throw('Player no encontrado', 404);
    }
    if (match.turno_player != player.id) {
      ctx.throw('No es tu turno!', 403);
    }
    if (match.subjugada != 'post_movimiento') {
      ctx.throw('No puedes escoger casilla aún. Subjugada inválida', 403);
    }

    const pos_hex = await ctx.request.body.hexagonPosition;
    const hexagono = await ctx.orm.Hexagon.findOne({
      where: {
        position: pos_hex,
        matchId: match.id,
      },
      include: [{ model: ctx.orm.Square, as: 'Square' }],
    });
    if (!hexagono) {
      ctx.throw('Hexagono no encontrado', 404);
    }

    const vertex_ = await player.getVertex();
    const vertex = await ctx.orm.Vertex.findByPk(vertex_.id, {
      include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
    });
    // const hexagons = await vertex.getHexagons(); // hexágonos adyacentes
    const hexIds = [];
    const hexagons = await ctx.orm.GoodPlayerHexagon.findAll({ // hexágonos posibles
      where: {
        playerId: player.id,
      },
    });
    console.log('2A', hexagons);
    for (let i = 0; i < hexagons.length; i++) {
      hexIds.push(hexagons[i].hexagonId);
    }

    if (!hexIds.includes(hexagono.id)) {
      ctx.throw('Hexágono escogido no es adyacente', 403);
    }

    const casilla = await hexagono.getSquare();
    if (!casilla) {
      ctx.throw('Casilla no encontrada', 404);
    }
    const hexagonsCambio = await ctx.orm.Hexagon.findAll({
      where: {
        [Op.not]: [
          { id: hexagono.id },
        ],
        matchId: match.id,
      },
    });
    if (!hexagonsCambio) {
      ctx.throw('Hexagonos distintos no encontrado', 404);
    }
    const random = Math.floor(Math.random() * hexagonsCambio.length);
    const hexagonoCambio = await hexagonsCambio[random];
    const casillaCambio = await ctx.orm.Square.findByPk(hexagonoCambio.squareId);
    if (!casillaCambio) {
      ctx.throw('Casilla cambio no encontrada', 404);
    }
    if (!hexagonsCambio) {
      ctx.throw('HexagonoCambio no encontrado', 404);
    }

    // CASILLAS TIPOS:
    if (casilla.name == 'botilleria') {
      const shot = await ctx.orm.Shot.findOne({
        where: {
          name: ctx.request.body.shotName,
        },
      });
      const payment = await ctx.request.body.payment;

      if (player.shot_1 && player.shot_2 && player.shot_3) {
        match.subjugada = 'post_casilla';
        await match.save();
        hexagonoCambio.squareId = casilla.id;
        hexagono.squareId = casillaCambio.id;
        await hexagonoCambio.save();
        await hexagono.save();
        ctx.throw('Ya tienes 3 shots!', 403);
      }

      if (payment == 'pina') {
        if (player.pina < shot.price) {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes piñas suficientes', 403);
        } else {
          player.pina -= shot.price;
        }
      } else if (payment == 'naranja') {
        if (player.naranja < shot.price) {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes naranjas suficientes', 403);
        } else {
          player.naranja -= shot.price;
        }
      } else if (payment == 'frutilla') {
        if (player.frutilla < shot.price) {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutillas suficientes', 403);
        } else {
          player.frutilla -= shot.price;
        }
      } else if (payment == 'limon') {
        if (player.limon < shot.price) {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes limones suficientes', 403);
        } else {
          player.limon -= shot.price;
        }
      } else {
        ctx.throw('Fruta no válida', 403);
      }

      if (!player.shot_1) {
        player.shot_1 = shot.id;
        await player.save();
      } else if (!player.shot_2) {
        player.shot_2 = shot.id;
        await player.save();
      } else if (!player.shot_3) {
        player.shot_3 = shot.id;
        await player.save();
      } else {
        match.subjugada = 'post_casilla';
        await match.save();
        hexagonoCambio.squareId = casilla.id;
        hexagono.squareId = casillaCambio.id;
        await hexagonoCambio.save();
        await hexagono.save();
        ctx.throw('¡Ya tienes 3 shots! No puedes agregar otro', 403);
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      const efecto = 'Compraste un shot!';
      const comentario = `Ahora tienes un ${shot.name}`;

      ctx.body = {
        casilla: 'botilleria',
        efecto,
        comentario,
        player,
        shotAdded: shot,
      };
    } else if (casilla.name == 'happyHour') {
      const coctel = await ctx.request.body.coctel;
      if (coctel == 'bestInShow') {
        if (player.best_in_show) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.naranja >= 5 && player.frutilla >= 15) {
          player.narnaja -= 5;
          player.frutilla -= 15;
          player.best_in_show = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'daiquiriFrutilla') {
        if (player.daiquiri_frutilla) {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.limon >= 5 && player.frutilla >= 15) {
          player.limon -= 5;
          player.frutilla -= 15;
          player.daiquiri_frutilla = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'margaritaFrutilla') {
        if (player.margarita_frutilla) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.frutilla >= 5 && player.limon >= 15) {
          player.frutilla -= 5;
          player.limon -= 15;
          player.margarita_frutilla = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'tequilaSunrise') {
        if (player.tequila_sunrise) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.naranja >= 20) {
          player.naranja -= 20;
          player.tequila_sunrise = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'pinaColada') {
        if (player.pina_colada) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.pina >= 20) {
          player.pina -= 20;
          player.pina_colada = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'primavera') {
        if (player.primavera) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.naranja >= 10 && player.pina >= 10) {
          player.naranja -= 10;
          player.pina -= 10;
          player.primavera = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else if (coctel == 'pinaCaipirina') {
        if (player.pina_caipirina) {
          ctx.throw('Ya tienes este coctel!', 403);
        } else if (player.pina >= 5 && player.limon >= 15) {
          player.pina -= 5;
          player.limon -= 15;
          player.pina_caipirina = true;
          player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
          await player.save();
        } else {
          match.subjugada = 'post_casilla';
          await match.save();
          hexagonoCambio.squareId = casilla.id;
          hexagono.squareId = casillaCambio.id;
          await hexagonoCambio.save();
          await hexagono.save();
          ctx.throw('No tienes frutas suficientes!', 403);
        }
      } else {
        ctx.throw('Coctel no válido', 403);
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      const efecto = 'Compraste un coctel!';
      const comentario = `Ahora tienes un ${coctel}`;

      ctx.body = {
        casilla: 'happyHour',
        efecto,
        comentario,
        player,
        match,
      };
    } else if (casilla.name == 'ruletaNeutra') {
      const opcionesNeutras = ['+pina', '+naranja', '+frutilla', '+limon',
        '-pina', '-naranja', '-frutilla', '-limon',
        '+pina', '+naranja', '+frutilla', '+limon',
        '-pina', '-naranja', '-frutilla', '-limon',
        '+coctel', '-coctel'];
      for (let i = opcionesNeutras.length - 1; i > 0; i--) { // shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesNeutras[i], opcionesNeutras[j]] = [opcionesNeutras[j], opcionesNeutras[i]];
      }

      const opcion = opcionesNeutras.shift();
      let comentarioExtra = '';
      let efecto = '';
      if (opcion == '+pina') {
        efecto = 'Ganaste una piña!';
        player.pina += 1;
        await player.save();
      } else if (opcion == '+naranja') {
        efecto = 'Ganaste una naranja!';
        player.naranja += 1;
        await player.save();
      } else if (opcion == '+frutilla') {
        efecto = 'Ganaste una frutilla!';
        player.frutilla += 1;
        await player.save();
      } else if (opcion == '+limon') {
        efecto = 'Ganaste un limón!';
        player.limon += 1;
        await player.save();
      } else if (opcion == '-pina') {
        efecto = 'Perdiste una piña!';
        if (player.pina > 1) {
          player.pina -= 1;
        } else {
          player.pina = 0;
          comentarioExtra = 'No tenías piñas';
        }
        await player.save();
      } else if (opcion == '-naranja') {
        efecto = 'Perdiste una naranja!';
        if (player.naranja > 1) {
          player.naranja -= 1;
        } else {
          player.naranja = 0;
          comentarioExtra = 'No tenías naranjas';
        }
        await player.save();
      } else if (opcion == '-frutilla') {
        efecto = 'Perdiste una frutilla!';
        if (player.frutilla > 1) {
          player.frutilla -= 1;
        } else {
          player.frutilla = 0;
          comentarioExtra = 'No tenías frutillas';
        }
        await player.save();
      } else if (opcion == '-limon') {
        efecto = 'Perdiste un limón!';
        if (player.limon > 1) {
          player.limon -= 1;
        } else {
          player.limon = 0;
          comentarioExtra = 'No tenías limones';
        }
        await player.save();
      } else if (opcion == '+coctel') {
        efecto = 'Ganaste un coctel!';
        if (!player.best_in_show) {
          player.best_in_show = true;
          await player.save();
          comentarioExtra = 'Ganaste un Best in Show!';
        } else if (!player.daiquiri_frutilla) {
          player.daiquiri_frutilla = true;
          await player.save();
          comentarioExtra = 'Ganaste un Daiquiri Frutilla!';
        } else if (!player.margarita_frutilla) {
          player.margarita_frutilla = true;
          await player.save();
          comentarioExtra = 'Ganaste un Margarita Frutilla!';
        } else if (!player.tequila_sunrise) {
          player.tequila_sunrise = true;
          await player.save();
          comentarioExtra = 'Ganaste un Tequila Sunrise!';
        } else if (!player.pina_colada) {
          player.pina_colada = true;
          await player.save();
          comentarioExtra = 'Ganaste una Pina Colada!';
        } else if (!player.primavera) {
          player.primavera = true;
          await player.save();
          comentarioExtra = 'Ganaste un Primavera!';
        } else if (!player.pina_caipirina) {
          player.pina_caipirina = true;
          await player.save();
          comentarioExtra = 'Ganaste una Pina Caipirina!';
        } else {
          comentarioExtra = 'Ya tienes todos los cocteles!';
        }
      } else {
        efecto = 'Perdiste un coctel!';
        if (player.best_in_show) {
          player.best_in_show = false;
          await player.save();
          comentarioExtra = 'Perdiste un Best in Show!';
        } else if (player.daiquiri_frutilla) {
          player.daiquiri_frutilla = false;
          await player.save();
          comentarioExtra = 'Perdiste un Daiquiri Frutilla!';
        } else if (player.margarita_frutilla) {
          player.margarita_frutilla = false;
          await player.save();
          comentarioExtra = 'Perdiste un Margarita Frutilla!';
        } else if (player.tequila_sunrise) {
          player.tequila_sunrise = false;
          await player.save();
          comentarioExtra = 'Perdiste un Tequila Sunrise!';
        } else if (player.pina_colada) {
          player.pina_colada = false;
          await player.save();
          comentarioExtra = 'Perdiste una Pina Colada!';
        } else if (player.primavera) {
          player.primavera = false;
          await player.save();
          comentarioExtra = 'Perdiste un Primavera!';
        } else if (player.pina_caipirina) {
          player.pina_caipirina = false;
          await player.save();
          comentarioExtra = 'Perdiste una Pina Caipirina!';
        } else {
          comentarioExtra = 'No tienes ningún coctel!';
        }
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'ruletaNeutra',
        resultado: opcion,
        efecto,
        comentario: comentarioExtra,
        player,
        match,
      };
    } else if (casilla.name == 'tornado') {
      const hexagons = await ctx.orm.Hexagon.findAll({
        where: { matchId: match.id },
      });
      for (let i = hexagons.length - 1; i > 0; i--) { // shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [hexagons[i], hexagons[j]] = [hexagons[j], hexagons[i]];
      }
      const hexagonsChange = hexagons.splice(0, 10);
      const h1 = hexagonsChange[0];
      const c1 = hexagonsChange[0].squareId;
      const h2 = hexagonsChange[1];
      const c2 = hexagonsChange[1].squareId;
      const h3 = hexagonsChange[2];
      const c3 = hexagonsChange[2].squareId;
      const h4 = hexagonsChange[3];
      const c4 = hexagonsChange[3].squareId;
      const h5 = hexagonsChange[4];
      const c5 = hexagonsChange[4].squareId;
      const h6 = hexagonsChange[5];
      const c6 = hexagonsChange[5].squareId;
      const h7 = hexagonsChange[6];
      const c7 = hexagonsChange[6].squareId;
      const h8 = hexagonsChange[7];
      const c8 = hexagonsChange[7].squareId;
      const h9 = hexagonsChange[8];
      const c9 = hexagonsChange[8].squareId;
      const h10 = hexagonsChange[9];
      const c10 = hexagonsChange[9].squareId;

      h1.squareId = c2;
      h2.squareId = c1;
      h3.squareId = c3;
      h4.squareId = c4;
      h5.squareId = c6;
      h6.squareId = c5;
      h7.squareId = c8;
      h8.squareId = c7;
      h9.squareId = c10;
      h10.squareId = c9;
      await h1.save();
      await h2.save();
      await h3.save();
      await h4.save();
      await h5.save();
      await h6.save();
      await h7.save();
      await h8.save();
      await h9.save();
      await h10.save();

      const hexagons_ = await ctx.orm.Hexagon.findAll({
        where: { matchId: match.id },
        include: [{ model: ctx.orm.Square, as: 'Square' }],
      });

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      const efecto = 'Desataste un tornado!';
      const comentario = 'Se han intercambiado 10 casillas!';

      ctx.body = {
        casilla: 'tornado',
        efecto,
        comentario,
        hexagonsUpdated: hexagons_,
        match,
      };
    } else if (casilla.name == 'uber') {
      const vertices = await ctx.orm.Vertex.findAll({
        where: {
          playerId: null,
          matchId: match.id,
        },
      });
      const pv = await player.getVertex();
      pv.playerId = null;
      const random = Math.floor(Math.random() * vertices.length);
      const new_v = vertices[random];
      new_v.playerId = player.id;
      await pv.save();
      await new_v.save();
      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      const efecto = 'Tomaste un uber!';
      const comentario = 'Has llegado a tu destino';

      console.log(new_v);
      const hexvs = await new_v.getHexagons();
      console.log(hexvs);
      const probv = await player.getVertex();
      console.log(probv);

      const pvx = await ctx.orm.PlayerVertex.findOne({
        where: { playerId: player.id },
      });
      pvx.vertexId = new_v.id;
      await pvx.save();
      await player.save();

      ctx.body = {
        casilla: 'uber',
        efecto,
        comentario,
        newVertex: new_v,
        player,
        match,
      };
    } else if (casilla.name == 'equilibrio') {
      console.log('ENTRÓ EQUILIBRIO');
      const p1 = await match.getPlayer1();
      const p2 = await match.getPlayer2();
      const p3 = await match.getPlayer3();
      const p4 = await match.getPlayer4();

      const f1 = p1.pina + p1.naranja + p1.frutilla + p1.limon;
      const f2 = p2.pina + p2.naranja + p2.frutilla + p2.limon;
      const f3 = p3.pina + p3.naranja + p3.frutilla + p3.limon;
      const f4 = p4.pina + p4.naranja + p4.frutilla + p4.limon;

      const ops = [f1, f2, f3, f4];
      const ops1 = [[p1, f1], [p2, f2], [p3, f3], [p4, f4]];

      const max_ = Math.max(...ops);
      const min_ = Math.min(...ops);

      for (let i = 4 - 1; i > 0; i--) { // shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [ops1[i], ops1[j]] = [ops1[j], ops1[i]];
      }
      const ps = [];
      if (max_ == ops1[0][1]) {
        const pf = ops1.splice(0, 1);
        console.log('PF', pf);
        const p = pf[0][0];
        console.log('P:', p);
        if (p.pina > 0) {
          p.pina -= 1;
        }
        if (p.naranja > 0) {
          p.naranja -= 1;
        }
        if (p.frutilla > 0) {
          p.frutilla -= 1;
        }
        if (p.limon > 0) {
          p.limon -= 1;
        }
        await p.save();
        ps.push(p);
      } else if (max_ == ops1[1][1]) {
        const pf = ops1.splice(1, 1);
        console.log('PF', pf);
        const p = pf[0][0];
        console.log('P', p);
        if (p.pina > 0) {
          p.pina -= 1;
        }
        if (p.naranja > 0) {
          p.naranja -= 1;
        }
        if (p.frutilla > 0) {
          p.frutilla -= 1;
        }
        if (p.limon > 0) {
          p.limon -= 1;
        }
        await p.save();
        ps.push(p);
      } else if (max_ == ops1[2][1]) {
        const pf = ops1.splice(2, 1);
        console.log('PF', pf);
        const p = pf[0][0];
        console.log('P', p);
        if (p.pina > 0) {
          p.pina -= 1;
        }
        if (p.naranja > 0) {
          p.naranja -= 1;
        }
        if (p.frutilla > 0) {
          p.frutilla -= 1;
        }
        if (p.limon > 0) {
          p.limon -= 1;
        }
        await p.save();
        ps.push(p);
      } else if (max_ == ops1[3][1]) {
        const pf = ops1.splice(3, 1);
        console.log('PF', pf);
        const p = pf[0][0];
        console.log('P', p);
        if (p.pina > 0) {
          p.pina -= 1;
        }
        if (p.naranja > 0) {
          p.naranja -= 1;
        }
        if (p.frutilla > 0) {
          p.frutilla -= 1;
        }
        if (p.limon > 0) {
          p.limon -= 1;
        }
        await p.save();
        ps.push(p);
      }
      if (min_ == ops1[0][1]) {
        const pf = ops1.splice(0, 1);
        const p = pf[0][0];
        p.pina += 1;
        p.naranja += 1;
        p.limon += 1;
        p.frutilla += 1;
        await p.save();
        ps.push(p);
      } else if (min_ == ops1[1][1]) {
        const pf = ops1.splice(1, 1);
        const p = pf[0][0];
        p.pina += 1;
        p.naranja += 1;
        p.limon += 1;
        p.frutilla += 1;
        await p.save();
        ps.push(p);
      } else if (min_ == ops1[2][1]) {
        const pf = ops1.splice(2, 1);
        const p = pf[0][0];
        p.pina += 1;
        p.naranja += 1;
        p.limon += 1;
        p.frutilla += 1;
        await p.save();
        ps.push(p);
      }
      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      const efecto = 'Has equilibrado un poco el juego!';
      const comentario = `El ${ps[0].personaje} ha perdido frutas y ${ps[1].personaje} las ha ganado`;

      ctx.body = {
        casilla: 'equilibrio',
        efecto,
        comentario,
        bestPlayerNow: ps[0],
        worstPlayerNow: ps[1],
        match,
      };
    } else if (casilla.name == 'zorro') {
      if (player.pina > 2) {
        player.pina -= 3;
      } else {
        player.pina = 0;
      }
      if (player.naranja > 2) {
        player.naranja -= 3;
      } else {
        player.naranja = 0;
      }
      if (player.limon > 2) {
        player.limon -= 3;
      } else {
        player.limon = 0;
      }
      if (player.frutilla > 2) {
        player.frutilla -= 3;
      } else {
        player.frutilla = 0;
      }
      await player.save();

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'zorro',
        efecto: 'Oh no! El zorro te ha robado frutas',
        comentario: `Ahora tienes ${player.pina} piñas, ${player.naranja} naranjas, ${player.limon} limones y ${player.frutilla} frutillas`,
        player,
        match,
      };
    } else if (casilla.name == 'ruletaMala') {
      const opcionesMalas = ['-pina', '-naranja', '-frutilla', '-limon',
        '-pina', '-naranja', '-frutilla', '-limon',
        '-shot', '-coctel', '+alcohol', '+alcohol'];
      for (let i = opcionesMalas.length - 1; i > 0; i--) { // shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesMalas[i], opcionesMalas[j]] = [opcionesMalas[j], opcionesMalas[i]];
      }

      const opcion = opcionesMalas.shift();
      let comentarioExtra = '';
      if (opcion == '-pina') {
        efecto = 'Perdiste una piña!';
        if (player.pina > 1) {
          player.pina -= 1;
        } else {
          player.pina = 0;
          comentarioExtra = 'No tenías piñas';
        }
        await player.save();
      } else if (opcion == '-naranja') {
        efecto = 'Perdiste una naranja!';
        if (player.naranja > 1) {
          player.naranja -= 1;
        } else {
          player.naranja = 0;
          comentarioExtra = 'No tenías naranjas';
        }
        await player.save();
      } else if (opcion == '-frutilla') {
        efecto = 'Perdiste una frutilla!';
        if (player.frutilla > 1) {
          player.frutilla -= 1;
        } else {
          player.frutilla = 0;
          comentarioExtra = 'No tenías frutillas';
        }
        await player.save();
      } else if (opcion == '-limon') {
        efecto = 'Perdiste un limón!';
        if (player.limon > 1) {
          player.limon -= 1;
        } else {
          player.limon = 0;
          comentarioExtra = 'No tenías limones';
        }
        await player.save();
      } else if (opcion == '-coctel') {
        efecto = 'Perdiste un coctel!';
        if (player.best_in_show) {
          player.bestInShow = false;
          await player.save();
          comentarioExtra = 'Perdiste un Best in Show!';
        } else if (player.daiquiri_frutilla) {
          player.daiquiri_frutilla = false;
          await player.save();
          comentarioExtra = 'Perdiste un Daiquiri Frutilla!';
        } else if (player.margarita_frutilla) {
          player.margarita_frutilla = false;
          await player.save();
          comentarioExtra = 'Perdiste un Margarita Frutilla!';
        } else if (player.tequila_sunrise) {
          player.tequila_sunrise = false;
          await player.save();
          comentarioExtra = 'Perdiste un Tequila Sunrise!';
        } else if (player.pina_colada) {
          player.pina_colada = false;
          await player.save();
          comentarioExtra = 'Perdiste una Pina Colada!';
        } else if (player.primavera) {
          player.primavera = false;
          await player.save();
          comentarioExtra = 'Perdiste un Primavera!';
        } else if (player.pina_caipirina) {
          player.pina_caipirina = false;
          await player.save();
          comentarioExtra = 'Perdiste una Pina Caipirina!';
        } else {
          comentarioExtra = 'No tienes ningún coctel!';
        }
      } else if (opcion == '+alcohol') {
        player.nivel_alcohol = Math.round((player.nivel_alcohol + 0.1) * 10) / 10;
        await player.save();
        efecto = 'Subió tu nivel de alcohol';
        comentarioExtra = '+0.1';
      } else if (opcion == '-shot') {
        efecto = 'Pierdes 1 shot';
        if (player.shot_1) {
          player.shot_1 = null;
          await player.save();
          comentarioExtra = 'Perdiste tu shot 1';
        } else if (player.shot_2) {
          player.shot_2 = null;
          await player.save();
          comentarioExtra = 'Perdiste tu shot 2';
        } else if (player.shot_3) {
          player.shot_3 = null;
          await player.save();
          comentarioExtra = 'Perdiste tu shot 3';
        } else {
          comentarioExtra = 'No tenías shots';
        }
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'ruletaMala',
        resultado: opcion,
        efecto,
        comentario: comentarioExtra,
        player,
        match,
      };
    } else if (casilla.name == 'borrachito') {
      let comentario = '';
      if (player.shot_1) {
        player.shot_1 = null;
        await player.save();
        comentario = 'El borrachito te quitó tu shot 1';
      } else if (player.shot_2) {
        player.shot_2 = null;
        await player.save();
        comentario = 'El borrachito te quitó tu shot 2';
      } else if (player.shot_3) {
        player.shot_3 = null;
        await player.save();
        comentario = 'El borrachito te quitó tu shot 3';
      } else {
        comentario = 'El borrachito no te pudo quitar nada porque no tienes shots';
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'borrachito',
        efecto: 'El borrachito quiere quiere más alcohol y va por tus shots!',
        comentario,
        player,
        match,
      };
    } else if (casilla.name == 'arbol') {
      player.pina += 3;
      player.naranja += 3;
      player.limon += 3;
      player.frutilla += 3;
      await player.save();

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'arbol',
        efecto: 'Has encontrado un árbol con frutas!',
        comentario: `Ahora tienes ${player.pina} piñas, ${player.naranja} naranjas, ${player.limon} limones y ${player.frutilla} frutillas`,
        player,
        match,
      };
    } else if (casilla.name == 'ruletaBuena') {
      const opcionesBuenas = ['+pina', '+naranja', '+frutilla', '+limon',
        '+pina', '+naranja', '+frutilla', '+limon',
        '+coctel', '-alcohol', '-alcohol'];
      for (let i = opcionesBuenas.length - 1; i > 0; i--) { // shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesBuenas[i], opcionesBuenas[j]] = [opcionesBuenas[j], opcionesBuenas[i]];
      }

      const opcion = opcionesBuenas.shift();
      let comentarioExtra = '';
      if (opcion == '+pina') {
        efecto = 'Ganaste una piña!';
        player.pina += 1;
        await player.save();
      } else if (opcion == '+naranja') {
        efecto = 'Ganaste una naranja!';
        player.naranja += 1;
        await player.save();
      } else if (opcion == '+frutilla') {
        efecto = 'Ganaste una frutilla!';
        player.frutilla += 1;
        await player.save();
      } else if (opcion == '+limon') {
        efecto = 'Ganaste una limon!';
        player.limon += 1;
        await player.save();
      } else if (opcion == '+coctel') {
        efecto = 'Ganaste un coctel!';
        if (!player.best_in_show) {
          player.best_in_show = true;
          await player.save();
          comentarioExtra = 'Ganaste un Best in Show!';
        } else if (!player.daiquiri_frutilla) {
          player.daiquiri_frutilla = true;
          await player.save();
          comentarioExtra = 'Ganaste un Daiquiri Frutilla!';
        } else if (!player.margarita_frutilla) {
          player.margarita_frutilla = true;
          await player.save();
          comentarioExtra = 'Ganaste un Margarita Frutilla!';
        } else if (!player.tequila_sunrise) {
          player.tequila_sunrise = true;
          await player.save();
          comentarioExtra = 'Ganaste un Tequila Sunrise!';
        } else if (!player.pina_colada) {
          player.pina_colada = true;
          await player.save();
          comentarioExtra = 'Ganaste una Pina Colada!';
        } else if (!player.primavera) {
          player.primavera = true;
          await player.save();
          comentarioExtra = 'Ganaste un Primavera!';
        } else if (!player.pina_caipirina) {
          player.pina_caipirina = true;
          await player.save();
          comentarioExtra = 'Ganaste una Pina Caipirina!';
        } else {
          comentarioExtra = 'Ya tienes todos los cocteles!';
        }
      } else if (opcion == '-alcohol') {
        if (player.nivel_alcohol > 0.1) {
          player.nivel_alcohol = Math.round((player.nivel_alcohol - 0.1) * 10) / 10;
        } else {
          player.nivel_alcohol = 0.0;
        }
        await player.save();
        efecto = 'Disminuye tu nivel de alcohol';
        comentarioExtra = '-0.1 de alcohol';
      }

      match.subjugada = 'post_casilla';
      await match.save();
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();

      ctx.body = {
        casilla: 'ruletaBuena',
        resultado: opcion,
        efecto,
        comentario: comentarioExtra,
        player,
        match,
      };
    } else if (casilla.name == 'barraLibre') {
      const shots = await ctx.orm.Shot.findAll();
      const freeShot = await shots[Math.floor(Math.random() * shots.length)];
      let com = `Ganaste un ${freeShot.name}!`;

      if (!player.shot_1) {
        player.shot_1 = freeShot.id;
        await player.save();
      } else if (!player.shot_2) {
        player.shot_2 = freeShot.id;
        await player.save();
      } else if (!player.shot_3) {
        player.shot_3 = freeShot.id;
        await player.save();
      } else {
        com = 'Ya tienes 3 shots! No puedes cargar más de eso';
      }
      hexagonoCambio.squareId = casilla.id;
      hexagono.squareId = casillaCambio.id;
      await hexagonoCambio.save();
      await hexagono.save();
      match.subjugada = 'post_casilla';
      await match.save();

      ctx.body = {
        casilla: 'barraLibre',
        efecto: 'Llegaste a la barra libre ¡Toma un shot de regalo!',
        comentario: com,
        freeShot,
        player,
      };
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// POST cambiar vértice del jugador
router.post('matches.show', '/:matchId/players/:id/vertex/:vertexId', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id);
    const new_vertex = await ctx.orm.Vertex.findByPk(ctx.params.vertexId, {
      include: [
        { model: ctx.orm.VertexVertex, as: 'vertices' },
        { model: ctx.orm.VertexVertex, as: 'vecinos' },
      ],
    });
    if (!player) {
      ctx.throw('Player no encontrado', 404);
    }
    if (!new_vertex) {
      ctx.throw('Vértice no encontrado', 404);
    }
    if (new_vertex.playerId) {
      ctx.throw('Ya hay otro jugador en este vértice!', 403);
    }
    const match = await ctx.orm.Match.findByPk(ctx.params.matchId);
    if (!match) {
      ctx.throw('Partida no encontrada', 404);
    }
    if (match.turno_player != player.id) {
      ctx.throw('No es tu turno!', 403);
    }
    if (match.subjugada != 'init' && match.subjugada != 'post_shot') {
      if (match.subjugada == 'FIN') {
        ctx.throw('No puedes jugar porque la partida ya finalizó.', 403);
      }
      ctx.throw('No te puedes mover! Subjugada incorrecta', 403);
    }

    const vertex = await player.getVertex();
    const playervertex = await player.getPlayerVertex();

    const vertexvertex = await ctx.orm.VertexVertex.findAll({
      attributes: ['id', 'vertexId', 'vecinoId'],
      where: {
        vertexId: vertex.id,
      },
    });
    console.log(vertexvertex);

    const vecinosId = [];
    for (let i = 0; i < vertexvertex.length; ++i) {
      const vv = await vertexvertex[i];
      vecinosId.push(vv.vecinoId);
    }
    console.log(vecinosId);

    if (!vecinosId.includes(new_vertex.id)) {
      ctx.throw('Vértice no es válido', 403);
    } else {
      playervertex.vertexId = new_vertex.id;
      await playervertex.save();
      new_vertex.playerId = player.id;
      await new_vertex.save();
      vertex.playerId = null;
      await vertex.save();
    }

    match.subjugada = 'post_movimiento';
    await match.save();
    let estado = 'Sobrio';

    const vertex_ = await ctx.orm.Vertex.findByPk(new_vertex.id, {
      include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
    });
    let hexagons = await vertex_.getHexagons();
    console.log('HEXAGONOOOOOS:', hexagons);
    if (player.nivel_alcohol > 0.3 && player.nivel_alcohol <= 0.7) {
      // SACAR 1 AL AZAR
      console.log('Jugador está curao');
      estado = 'Curao';
      const rand1 = Math.floor(Math.random() * hexagons.length);
      hexagons.splice(rand1, 1);
    } else if (player.nivel_alcohol > 0.7 && player.nivel_alcohol < 1) {
      // AL AZAR
      estado = 'Apagando tele';
      console.log('Jugador está apagando tele');
      const rand2 = Math.floor(Math.random() * hexagons.length);
      hexagons = [hexagons[rand2]];
    } else if (player.nivel_alcohol >= 1) {
      // PIERDE TURNO
      estado = 'Apagaste tele';
      console.log('El jugador apagó tele. Pierde 1 turno');
      hexagons = [];
      match.subjugada = 'post_casilla';
      await match.save();
      playervertex.vertexId = vertex.id;
      await playervertex.save();
      new_vertex.playerId = null;
      await new_vertex.save();
      vertex.playerId = player.id;
      await vertex.save();
      player.nivel_alcohol = 0.5;
      await player.save();
    }

    const oldGoodH = await ctx.orm.GoodPlayerHexagon.findAll({
      where: { playerId: player.id },
    });
    for (let j = 0; j < oldGoodH.length; j++) {
      const delete_ = await oldGoodH[j].destroy();
    }
    const posibleHexagons = [];
    for (let i = 0; i < hexagons.length; i++) {
      const new_goodph = await ctx.orm.GoodPlayerHexagon.create({
        playerId: player.id,
        hexagonId: hexagons[i].id,
      });
      posibleHexagons.push(new_goodph);
    }

    const pvx = await ctx.orm.PlayerVertex.findOne({
      where: { playerId: player.id },
    });
    pvx.vertexId = new_vertex.id;
    await pvx.save();
    await player.save();

    ctx.body = {
      estadoPlayer: estado,
      playerId: player.id,
      oldVertexId: vertex.id,
      oldVertexPlayer: vertex.playerId,
      newVertexId: new_vertex.id,
      newVertexPlayer: new_vertex.playerId,
      match,
      hexagonosAdyacentes: hexagons,
      goodHexagonsToMove: posibleHexagons,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
