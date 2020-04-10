const router = require('express').Router();
const { ErrorHandler } = require('../../common/error');
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../../resources/tasks/task.router.js');

router.use('/:boardId/tasks', tasksRouter);

router.get('/', (req, res) => {
  const boards = boardsService.getAll();
  if (!boards) {
    throw new ErrorHandler(404, 'Cannot get  list of boards');
  }
  res.json(boards.map(Board.toResponse));
});

router.post('/', (req, res) => {
  const board = new Board(req.body);
  boardsService.create(Board.toDB(board));
  res.json(Board.toResponse(board));
});

router.get('/:id', (req, res) => {
  const board = boardsService.findBoard(req.params.id);
  if (!board) {
    throw new ErrorHandler(404, 'Board not found');
  }
  res.json(Board.toResponse(board));
});

router.put('/:id', (req, res) => {
  const updatedBoard = boardsService.updateBoard(req.params.id, req.body);
  res.json(Board.toResponse(updatedBoard));
});

router.delete('/:id', (req, res) => {
  boardsService.deleteBoard(req.params.id);
  res.status(204).end();
});

module.exports = router;
