const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const create = (boardId, taskId) => tasksRepo.addData(boardId, taskId);

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
