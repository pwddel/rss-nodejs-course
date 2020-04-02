let users = [
  {
    id: 'd514acc4-a26c-4af0-8ddc-8b21d5090d4f',
    name: 'USER',
    login: 'user',
    password: 'passw@rd'
  },
  {
    id: '1d0ec0c0-7cca-4289-ada7-818d89f21372',
    name: 'USER',
    login: 'user',
    password: 'passw@rd'
  },
  {
    id: '2bf15bcb-1aae-4495-bac0-c0f2530cd723',
    name: 'USER',
    login: 'user',
    password: 'passw@rd'
  }
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const addUser = user => {
  users.push(user);
};

const updateUsers = newUsers => {
  console.log('Filtred users:', newUsers);
  users = [...newUsers];
};

module.exports = {
  getAll,
  addUser,
  updateUsers,
  users
};
