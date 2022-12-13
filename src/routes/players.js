const Router = require('koa-router');

const router = new Router();

// POST create players and new match (vertices, hexagonos, y tablas intermedias)
router.post('players.create', '/waitingroom/:waitingRoomId', async (ctx) => {
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
    if (!waitingRoom.full) {
      ctx.throw('Faltan jugadores, se necesitan 4 para jugar', 403);
    }

    const user1 = await waitingRoom.getUser1();
    const user2 = await waitingRoom.getUser2();
    const user3 = await waitingRoom.getUser3();
    const user4 = await waitingRoom.getUser4();

    // CREATE PLAYERS
    const player1 = await ctx.orm.Player.create({
      numero: 1,
      pina: 0,
      naranja: 0,
      limon: 0,
      frutilla: 0,
      personaje: waitingRoom.avatar1,
      nivel_alcohol: 0.0,
      best_in_show: false,
      daiquiri_frutilla: false,
      margarita_frutilla: false,
      tequila_sunrise: false,
      pina_colada: false,
      primavera: false,
      pina_caipirina: false,
      userId: user1.id,
    });
    const playeruser1 = await ctx.orm.PlayerUser.create({
      userId: user1.id,
      playerId: player1.id,
    });

    const player2 = await ctx.orm.Player.create({
      numero: 2,
      pina: 0,
      naranja: 0,
      limon: 0,
      frutilla: 0,
      personaje: waitingRoom.avatar2,
      nivel_alcohol: 0.0,
      best_in_show: false,
      daiquiri_frutilla: false,
      margarita_frutilla: false,
      tequila_sunrise: false,
      pina_colada: false,
      primavera: false,
      pina_caipirina: false,
      userId: user2.id,
    });
    const playeruser2 = await ctx.orm.PlayerUser.create({
      userId: user2.id,
      playerId: player2.id,
    });

    const player3 = await ctx.orm.Player.create({
      numero: 3,
      pina: 0,
      naranja: 0,
      limon: 0,
      frutilla: 0,
      personaje: waitingRoom.avatar3,
      nivel_alcohol: 0.0,
      best_in_show: false,
      daiquiri_frutilla: false,
      margarita_frutilla: false,
      tequila_sunrise: false,
      pina_colada: false,
      primavera: false,
      pina_caipirina: false,
      userId: user3.id,
    });
    const playeruser3 = await ctx.orm.PlayerUser.create({
      userId: user3.id,
      playerId: player3.id,
    });

    const player4 = await ctx.orm.Player.create({
      numero: 4,
      pina: 0,
      naranja: 0,
      limon: 0,
      frutilla: 0,
      personaje: waitingRoom.avatar4,
      nivel_alcohol: 0.0,
      best_in_show: false,
      daiquiri_frutilla: false,
      margarita_frutilla: false,
      tequila_sunrise: false,
      pina_colada: false,
      primavera: false,
      pina_caipirina: false,
      userId: user4.id,
    });
    const playeruser4 = await ctx.orm.PlayerUser.create({
      userId: user4.id,
      playerId: player4.id,
    });

    // CREATE MATCH
    const newMatch = await ctx.orm.Match.create({
      turno: 0,
      status: 'ongoing',
      turno_player: player1.id,
      numero_turnos: 20,
      ganador: null,
      player_1: player1.id,
      player_2: player2.id,
      player_3: player3.id,
      player_4: player4.id,
      current: player1.id,
      subjugada: 'init',
    });

    // SORT SQUARES
    const boardSquares = [];

    const posibleSquares = await ctx.orm.Square.findAll({
      attributes: ['id', 'tipo'],
    });

    const squaresObligatorias = await ctx.orm.Square.findAll({
      attributes: ['id', 'tipo'],
      where: {
        tipo: 'Obligatoria',
      },
    });
    squaresObligatorias.forEach((squareO) => {
      boardSquares.push(squareO.id);
    });

    const squaresNeutrales = await ctx.orm.Square.findAll({
      attributes: ['id', 'tipo'],
      where: {
        tipo: 'Neutral',
      },
    });
    squaresNeutrales.forEach((squareN) => {
      boardSquares.push(squareN.id);
    });

    const squaresMalas = await ctx.orm.Square.findAll({
      attributes: ['id', 'tipo'],
      where: {
        tipo: 'Mala',
      },
    });
    squaresMalas.forEach((squareM) => {
      boardSquares.push(squareM.id);
    });

    const squaresBuenas = await ctx.orm.Square.findAll({
      attributes: ['id', 'tipo'],
      where: {
        tipo: 'Buena',
      },
    });
    squaresBuenas.forEach((squareB) => {
      boardSquares.push(squareB.id);
    });
    // 70 hex 12 cas -> 12*6 = 72
    const otherSquares = [];
    posibleSquares.forEach((square) => {
      otherSquares.push(square.id);
      otherSquares.push(square.id);
      otherSquares.push(square.id);
      otherSquares.push(square.id);
      otherSquares.push(square.id);
    });

    const rand1 = Math.floor(Math.random() * 71);
    const rand2 = Math.floor(Math.random() * 70);
    otherSquares.splice(rand1, 1);
    otherSquares.splice(rand2, 1);
    otherSquares.forEach((sq) => {
      boardSquares.push(sq);
    });
    // SHUFFLE ARRAY
    for (let i = boardSquares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardSquares[i], boardSquares[j]] = [boardSquares[j], boardSquares[i]];
    }

    // CREATE BOARD
    for (let col = 1; col < 7; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_1 = await ctx.orm.Hexagon.create({
        position: `1-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_1.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_1.id,
      });
    }
    for (let col = 1; col < 8; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_2 = await ctx.orm.Hexagon.create({
        position: `2-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_2.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_2.id,
      });
    }
    for (let col = 1; col < 9; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_3 = await ctx.orm.Hexagon.create({
        position: `3-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_3.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_3.id,
      });
    }
    for (let col = 1; col < 10; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_4 = await ctx.orm.Hexagon.create({
        position: `4-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_4.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_4.id,
      });
    }
    for (let col = 1; col < 11; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_5 = await ctx.orm.Hexagon.create({
        position: `5-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_5.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_5.id,
      });
    }
    for (let col = 1; col < 10; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_6 = await ctx.orm.Hexagon.create({
        position: `6-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_6.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_6.id,
      });
    }
    for (let col = 1; col < 9; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_7 = await ctx.orm.Hexagon.create({
        position: `7-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_7.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_7.id,
      });
    }
    for (let col = 1; col < 8; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_8 = await ctx.orm.Hexagon.create({
        position: `8-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_8.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_8.id,
      });
    }
    for (let col = 1; col < 7; col++) {
      const sqId = await boardSquares.pop();
      const new_hex_9 = await ctx.orm.Hexagon.create({
        position: `9-${col}`,
        matchId: newMatch.id,
        squareId: sqId,
      });
      const new_hexagonsquare = await ctx.orm.HexagonSquare.create({
        hexagonId: new_hex_9.id,
        squareId: sqId,
      });
      const matchhexagon = await ctx.orm.MatchHexagon.create({
        matchId: newMatch.id,
        hexagonId: new_hex_9.id,
      });
    }

    // CREATE VERTICES
    const vertices_base_ = await ctx.orm.Vertex.findAll({
      where: {
        matchId: 1,
      },
      include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' },
        { model: ctx.orm.VertexVertex, as: 'vertices' }],
    });

    for (let i = 0; i < vertices_base_.length; i++) {
      const v_b = await vertices_base_[i];
      const hxs = await v_b.getHexagons();

      const hxs_pos = [];
      await hxs.forEach((h) => {
        hxs_pos.push(h.position);
      });

      const new_vertex = await ctx.orm.Vertex.create({
        position: v_b.position,
        matchId: newMatch.id,
      });

      for (let j = 0; j < hxs_pos.length; j++) {
        const relatedHex = await ctx.orm.Hexagon.findOne({
          where: {
            position: hxs_pos[j],
            matchId: newMatch.id,
          },
        });
        const hexagonvertex = await ctx.orm.HexagonVertex.create({
          hexagonId: relatedHex.id,
          vertexId: new_vertex.id,
        });
      }
    }

    // CREATE VERTEXVERTEX
    for (let k = 0; k < vertices_base_.length; ++k) {
      const v_b2 = await vertices_base_[k];
      const vertexvertexs = await v_b2.getVertices();

      for (let l = 0; l < vertexvertexs.length; ++l) {
        const old_v1 = await ctx.orm.Vertex.findByPk(vertexvertexs[l].vertexId);
        const old_v2 = await ctx.orm.Vertex.findByPk(vertexvertexs[l].vecinoId);
        const new_v1 = await ctx.orm.Vertex.findOne({
          where: {
            position: old_v1.position,
            matchId: newMatch.id,
          },
        });
        const new_v2 = await ctx.orm.Vertex.findOne({
          where: {
            position: old_v2.position,
            matchId: newMatch.id,
          },
        });
        const new_vv = await ctx.orm.VertexVertex.create({
          vertexId: new_v1.id,
          vecinoId: new_v2.id,
        });
      }
    }

    const vertex1 = await ctx.orm.Vertex.findOne({
      where: {
        matchId: newMatch.id,
        position: '2-1',
      },
    });
    const vertex2 = await ctx.orm.Vertex.findOne({
      where: {
        matchId: newMatch.id,
        position: '2-6',
      },
    });
    const vertex3 = await ctx.orm.Vertex.findOne({
      where: {
        matchId: newMatch.id,
        position: '15-1',
      },
    });
    const vertex4 = await ctx.orm.Vertex.findOne({
      where: {
        matchId: newMatch.id,
        position: '15-6',
      },
    });
    vertex1.playerId = await player1.id;
    await vertex1.save();
    vertex2.playerId = await player2.id;
    await vertex2.save();
    vertex3.playerId = await player3.id;
    await vertex3.save();
    vertex4.playerId = await player4.id;
    await vertex4.save();
    const playervertex1 = await ctx.orm.PlayerVertex.create({
      playerId: player1.id,
      vertexId: vertex1.id,
    });
    const playervertex2 = await ctx.orm.PlayerVertex.create({
      playerId: player2.id,
      vertexId: vertex2.id,
    });
    const playervertex3 = await ctx.orm.PlayerVertex.create({
      playerId: player3.id,
      vertexId: vertex3.id,
    });
    const playervertex4 = await ctx.orm.PlayerVertex.create({
      playerId: player4.id,
      vertexId: vertex4.id,
    });

    // DELETE WAITINGROOM
    await ctx.orm.WaitingRoom.destroy({
      where: { id: `${ctx.params.waitingRoomId}` },
    });

    ctx.status = 201;
    ctx.body = {
      player1,
      player2,
      player3,
      player4,
      newMatch,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// GET en qué vértices están los jugadores
router.get('players.show', '/:id/position', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id);
    if (!player) {
      ctx.throw('Jugador no encontrado', 404);
    }

    const vertex = await player.getVertex();

    ctx.body = {
      verticeId: vertex.id,
      verticePosition: vertex.position,
      playerId: vertex.playerId,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

// GET hexágonos adyacentes a vértice del jugador
router.get('players.show', '/:id/hexagons', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id);
    if (!player) {
      ctx.throw('Player no encontrado', 404);
    }

    const vertex_ = await player.getVertex();
    const vertex = await ctx.orm.Vertex.findByPk(vertex_.id, {
      include: [{ model: ctx.orm.Hexagon, as: 'Hexagons' }],
    });
    const hexagons = await vertex.getHexagons();

    ctx.body = {
      hexagonosAdyacentes: hexagons,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

module.exports = router;
