let db = [];

const getAll = () => db;

const addData = data => {
  db.push(data);
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

const deleteData = id => db.filter(data => data.id !== id);

module.exports = {
  getAll,
  addData,
  updateData,
  findData,
  deleteData,
  db
};
