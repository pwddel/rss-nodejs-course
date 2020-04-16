const User = require('./user.model');
const tasksRepo = require('../tasks/task.db.repository');

const findAll = async () => {
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
  await tasksRepo.unassigneUser(id);
  return User.deleteOne({ _id: id });
};

module.exports = {
  findAll,
  addData,
  updateData,
  findData,
  deleteData
};
