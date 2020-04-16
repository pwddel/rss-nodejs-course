const Task = require('./task.model');

const findAll = async boardId => {
  return Task.find({ boardId });
};

const addData = async task => {
  return Task.create(task);
};

const findData = async (boardId, taskId) => {
  return Task.findById({ _boardId: boardId, _id: taskId });
};

const updateData = async (boardId, taskId, newData) => {
  return Task.findOneAndUpdate({ boardId, _id: taskId }, newData);
};

const deleteData = async (boardId, taskId) => {
  if (!taskId) {
    await Task.deleteMany({ boardId });
  } else {
    await Task.findOneAndDelete({ _id: taskId, boardId });
  }
};

const unassigneUser = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  findAll,
  addData,
  updateData,
  findData,
  deleteData,
  unassigneUser
};
