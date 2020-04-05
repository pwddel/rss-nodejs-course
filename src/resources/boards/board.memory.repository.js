let db = [];

const getAll = () => db;

const addData = data => {
  console.log('ADD_DATA', data);
  db.push(data);
  console.log('DB:', db);
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
          title: newData.title
        });
      }
      return { ...data };
    })
  ];
  return dbUpdatedData;
};

const deleteData = id => {
  const filtred = db.filter(data => data.id !== id);
  console.log('FILTRED', filtred);
  db = [...filtred];
  console.log('DB AFTER FILTRED', db);
};

module.exports = {
  getAll,
  addData,
  findData,
  updateData,
  deleteData,
  db
};
