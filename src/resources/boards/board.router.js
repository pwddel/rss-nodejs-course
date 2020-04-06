const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../../resources/tasks/task.router.js');

router.use('/:boardId/tasks', tasksRouter);

router.get('/', (req, res) => {
  const users = boardsService.getAll();
  res.json(users.map(Board.toResponse));
});

router.post('/', (req, res) => {
  const board = new Board(req.body);
  console.log('POST BODY:', req.body);
  boardsService.create(Board.toDB(board));
  console.log('RESP_BOARD', Board.toResponse(board));
  res.json(Board.toResponse(board));
});

router.get('/:id', (req, res) => {
  const board = boardsService.findBoard(req.params.id);
  console.log('Route get /:id board:', board);
  console.log('Route get /:id id:', req.params.id);
  if (!board) res.status(404).send('The board not found');
  res.json(Board.toResponse(board));
});

router.put('/:id', (req, res) => {
  console.log('Route put updated user:', req.body);
  const updatedBoard = boardsService.updateBoard(req.params.id, req.body);
  /* console.log('Route put updated user:', updatedUser);*/
  res.json(Board.toResponse(updatedBoard));
});

router.delete('/:id', (req, res) => {
  console.log('ID', req.params.id);
  boardsService.deleteBoard(req.params.id);
  res.status(204).end();
});

module.exports = router;
