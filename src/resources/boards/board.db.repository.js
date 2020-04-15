const Board = require('./board.model');

const getAll = async () => {
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
  return Board.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  addData,
  findData,
  updateData,
  deleteData
};
