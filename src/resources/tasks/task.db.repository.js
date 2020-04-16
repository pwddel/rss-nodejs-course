const Task = require('./task.model');
/* const tasksRepo = require('../tasks/task.memory.repository');*/

const getAll = async () => {
  return Task.find({});
};

const addData = async (boardId, data) => {
  const newTask = { ...data, boardId };
  return Task.create(newTask);
};

const findData = async (boardId, taskId) => {
  return Task.findById({ _boardId: boardId, _id: taskId });
};

const updateData = async (boardId, taskId, newData) => {
  return Task.updateOne({ _boardId: boardId, _id: taskId }, newData);
};

const deleteData = async (boardId, taskId) => {
  return Task.deleteOne({ _boardId: boardId, _id: taskId });
};

module.exports = {
  getAll,
  addData,
  updateData,
  findData,
  deleteData
};
