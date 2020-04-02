const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = () => {
  const user = new User();
  usersRepo.addUser(user.userProperties());
  return user.userProperties();
};

const findUser = userId => {
  const { users } = usersRepo;
  return users.find(user => user.id === userId);
};

const updateUser = (userId, body) => {
  const { users } = usersRepo;
  const updatedUsers = users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        name: body.name,
        login: body.login,
        password: body.password
      };
    }
    return { ...user };
  });
  console.log('Udpated users:', updatedUsers);
  usersRepo.updateUsers(updatedUsers);
};

const deleteUser = userId => {
  const { users } = usersRepo;
  usersRepo.updateUsers(users.filter(user => user.id !== userId));
};

module.exports = {
  getAll,
  createUser,
  deleteUser,
  findUser,
  updateUser
};
