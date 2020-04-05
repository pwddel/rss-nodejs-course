const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const create = data => tasksRepo.addData(data);

const findTask = taskId => tasksRepo.findData(taskId);

const updateTask = (taskId, data) => tasksRepo.updateData(taskId, data);

const deleteTask = taskId => tasksRepo.deleteData(taskId);

module.exports = {
  getAll,
  create,
  findTask,
  updateTask,
  deleteTask
};
