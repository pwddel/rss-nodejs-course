const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.findAll();

const create = data => boardsRepo.addData(data);

const findBoard = boardId => boardsRepo.findData(boardId);

const updateBoard = (boardId, data) => boardsRepo.updateData(boardId, data);

const deleteBoard = boardId => boardsRepo.deleteData(boardId);

module.exports = {
  getAll,
  create,
  findBoard,
  updateBoard,
  deleteBoard
};
