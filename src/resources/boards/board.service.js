const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const create = data => boardRepo.addData(data);

module.exports = {
  getAll,
  create
};
