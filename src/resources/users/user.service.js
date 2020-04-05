const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = data => usersRepo.addData(data);

const findUser = userId => usersRepo.findData(userId);

const updateUser = (userId, data) => usersRepo.updateData(userId, data);

const deleteUser = userId => usersRepo.deleteData(userId);

module.exports = {
  getAll,
  create,
  deleteUser,
  findUser,
  updateUser
};
