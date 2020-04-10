const router = require('express').Router({ mergeParams: true });
const { ErrorHandler } = require('../../common/error');

const tasksService = require('./task.service');

router.get('/', (req, res) => {
  const tasks = tasksService.getAll(req.params.boardId);
  if (!tasks) {
    throw new ErrorHandler(404, 'Cannot get  list of tasks');
  }
  res.json(tasks);
});

router.get('/:taskId', (req, res) => {
  const task = tasksService.findTask(req.params.boardId, req.params.taskId);
  /* console.log('TASK', task);*/
  if (!task) {
    throw new ErrorHandler(404, 'Task not found');
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const newTask = tasksService.create(req.params.boardId, req.body);
  res.json(newTask);
});

router.put('/:taskId', (req, res) => {
  const updatedTask = tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  if (!updatedTask) res.status(404).send('The task not found');
  res.json(updatedTask);
});

router.delete('/:taskId', (req, res) => {
  tasksService.deleteTask(req.params.boardId, req.params.taskId);
  res.status(204).end();
});

module.exports = router;
