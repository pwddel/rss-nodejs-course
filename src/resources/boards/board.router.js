const router = require('express').Router();
const { ErrorHandler } = require('../../common/error');
const boardsService = require('./board.service');
const tasksRouter = require('../../resources/tasks/task.router.js');

router.use('/:boardId/tasks', tasksRouter);

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  if (!boards) {
    throw new ErrorHandler(404, 'Cannot get  list of boards');
  }
  res.json(boards);
});

router.post('/', async (req, res) => {
  const newBoard = await boardsService.create(req.body);
  res.json(newBoard);
});

router.get('/:id', async (req, res) => {
  const board = await boardsService.findBoard(req.params.id);
  if (!board) {
    throw new ErrorHandler(404, 'Board not found');
  }
  res.json(board);
});

router.put('/:id', async (req, res) => {
  const updatedBoard = await boardsService.updateBoard(req.params.id, req.body);
  res.json(updatedBoard);
});

router.delete('/:id', async (req, res) => {
  await boardsService.deleteBoard(req.params.id);
  res.status(204).end();
});

module.exports = router;
