const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.findAll(boardId);

const create = task => tasksRepo.addData(task);

const findTask = (boardId, taskId) => tasksRepo.findData(boardId, taskId);

const updateTask = (boardId, taskId, data) =>
  tasksRepo.updateData(boardId, taskId, data);

const deleteTask = (boardId, taskId) => tasksRepo.deleteData(boardId, taskId);

module.exports = {
  getAll,
  create,
  findTask,
  updateTask,
  deleteTask
};
