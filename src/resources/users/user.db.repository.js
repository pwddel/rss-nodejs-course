const User = require('./user.model');
/* const tasksRepo = require('../tasks/task.memory.repository');*/

const getAll = async () => {
  return User.find({});
};

const addData = async data => {
  return User.create(data);
};

const findData = async id => {
  return User.findById(id);
};

const updateData = async (id, newData) => {
  return User.updateOne({ _id: id }, newData);
};

const deleteData = async id => {
  return User.deleteOne({ _id: id }).deletedCount;
};

module.exports = {
  getAll,
  addData,
  updateData,
  findData,
  deleteData
};
