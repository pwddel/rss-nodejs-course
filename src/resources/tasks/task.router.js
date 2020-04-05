const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/boards/:BoardsId/tasks', (req, res) => {
  console.log(req.params);
  const users = tasksService.getAll();
  res.json(users.map(Task.toResponse));
});

module.exports = router;
