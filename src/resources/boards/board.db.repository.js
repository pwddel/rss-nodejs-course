const Board = require('./board.model');
const tasksRepo = require('../tasks/task.db.repository');

const findAll = async () => {
  return Board.find({});
};

const addData = async data => {
  return Board.create(data);
};

const findData = async id => {
  return Board.findById(id);
};

const updateData = async (id, newData) => {
  return Board.updateOne({ _id: id }, newData);
};

const deleteData = async id => {
  await tasksRepo.deleteData(id);
  return Board.deleteOne({ _id: id });
};

module.exports = {
  findAll,
  addData,
  findData,
  updateData,
  deleteData
};
