const db = [];

const getAll = () => db;

const addData = data => {
  console.log('ADD_DATA', data);
  db.push(data);
  console.log('DB:', db);
};

module.exports = {
  getAll,
  addData,
  db
};
