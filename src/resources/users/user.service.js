const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.findAll();

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
