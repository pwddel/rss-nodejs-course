const router = require('express').Router({ mergeParams: true });
const errorCatcher = require('../../common/errorCatcher');
const { ErrorHandler } = require('../../common/error');
const tasksService = require('./task.service');

router.get(
  '/',
  errorCatcher(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    if (!tasks) {
      throw new ErrorHandler(404, 'Cannot get  list of tasks');
    }
    res.json(tasks);
  })
);

router.get(
  '/:taskId',
  errorCatcher(async (req, res) => {
    const task = await tasksService.findTask(
      req.params.boardId,
      req.params.taskId
    );
    /* console.log('TASK', task);*/
    if (!task) {
      throw new ErrorHandler(404, 'Task not found');
    }
    res.json(task);
  })
);

router.post(
  '/',
  errorCatcher(async (req, res) => {
    const newTask = await tasksService.create(req.params.boardId, req.body);
    res.json(newTask);
  })
);

router.put(
  '/:taskId',
  errorCatcher(async (req, res) => {
    const updatedTask = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (!updatedTask) res.status(404).send('The task not found');
    res.json(updatedTask);
  })
);

router.delete(
  '/:taskId',
  errorCatcher(async (req, res) => {
    await tasksService.deleteTask(req.params.boardId, req.params.taskId);
    res.status(204).end();
  })
);

module.exports = router;
