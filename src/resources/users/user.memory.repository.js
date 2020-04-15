const tasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

let db = [];

const getAll = () => db;

const addData = data => {
  const newData = new User(data);
  db.push(newData);
  return newData;
  /* console.log('DB:', db);*/
};

const findData = id => {
  /* console.log('User.memory findData id:', id);*/
  return db.find(data => data.id === id);
};

const updateData = (id, newData) => {
  let dbUpdatedData = {};
  db = [
    ...db.map(data => {
      if (data.id === id) {
        return (dbUpdatedData = {
          ...data,
          name: newData.name,
          login: newData.login,
          password: newData.password
        });
      }
      return { ...data };
    })
  ];
  return dbUpdatedData;
};

const deleteData = id => {
  tasksRepo.unassignUser(id);
  const filtred = db.filter(data => data.id !== id);
  db = [...filtred];
  return 'Deleted';
};

module.exports = {
  getAll,
  addData,
  updateData,
  findData,
  deleteData,
  db
};
