const Task = require('./task.model');
let db = [];

const getAll = id => {
  return db.filter(data => data.boardId === id);
};

const addData = (boardId, task) => {
  const newTask = new Task({ boardId, ...task });
  console.log('---------------------------------------', newTask);
  db.push(newTask);
  return newTask;
};
const updateData = (boardId, taskId, newData) => {
  const newDB = db.map(data => {
    if (data.id === taskId && data.boardId === boardId) {
      return {
        ...data,
        ...newData
      };
    }
    return { ...data };
  });
  db = [...newDB];
  console.log('DB AFTER UPDATED', db);
  return db.find(data => data.id === taskId && data.boardId === boardId);
};

const deleteData = (boardId, taskId) => {
  let filtred = [];
  if (!taskId) {
    filtred = db.filter(task => task.boardId !== boardId);
  } else {
    filtred = db.filter(task => task.id !== taskId && task.boardId !== boardId);
  }
  /* console.log('DELETE ID', taskId);*/
  db = [...filtred];
};

const unassigneUser = userId => {
  const unassigned = db.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
  db = [...unassigned];
};

const findData = (boardId, taskId) => {
  /* console.log('BOARD', boardId);
  console.log('TASK', taskId);*/
  return db.find(data => data.id === taskId && data.boardId === boardId);
};

module.exports = {
  getAll,
  addData,
  updateData,
  deleteData,
  unassigneUser,
  findData,
  db
};
