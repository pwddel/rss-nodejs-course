const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.get('/', (req, res) => {
  const users = boardsService.getAll();
  res.json(users.map(Board.toResponse));
});

router.post('/', (req, res) => {
  const board = new Board(req.body);
  console.log('POST BODY:', req.body);
  boardsService.create(Board.toDB(board));
  console.log('RESP_BOARD', Board.toResponse(board));
  console.log();
  res.json(Board.toResponse(board));
});

module.exports = router;
