const router = require('express').Router();
const errorCatcher = require('../../common/errorCatcher');
const { ErrorHandler } = require('../../common/error');
const boardsService = require('./board.service');
const Board = require('./board.model');
const tasksRouter = require('../../resources/tasks/task.router.js');
const { validate, schemas } = require('../../common/validate');

router.use('/:boardId/tasks', tasksRouter);

router.get(
  '/',
  validate(schemas.id, 'params'),
  errorCatcher(async (req, res) => {
    const boards = await boardsService.getAll();
    if (!boards) {
      throw new ErrorHandler(404, 'Cannot get list of users');
    }
    res.json(boards.map(Board.toResponse));
  })
);

router.post(
  '/',
  validate(schemas.board, 'body'),
  errorCatcher(async (req, res) => {
    const newBoard = await boardsService.create(req.body);
    res.json(Board.toResponse(newBoard));
  })
);

router.get(
  '/:id',
  validate(schemas.id, 'params'),
  errorCatcher(async (req, res) => {
    const board = await boardsService.findBoard(req.params.id);
    if (!board) {
      throw new ErrorHandler(404, 'Board not found');
    }
    res.json(Board.toResponse(board));
  })
);

router.put(
  '/:id',
  errorCatcher(async (req, res) => {
    const updatedBoard = await boardsService.updateBoard(
      req.params.id,
      req.body
    );
    res.json(Board.toResponse(updatedBoard));
  })
);

router.delete(
  '/:id',
  validate(schemas.id, 'params'),
  errorCatcher(async (req, res) => {
    await boardsService.deleteBoard(req.params.id);
    res.status(204).end();
  })
);

module.exports = router;
