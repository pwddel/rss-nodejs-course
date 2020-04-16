const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  _id: {
    type: String,
    default: uuid
  },
  _userId: {
    type: String,
    default: uuid
  },
  _boardId: {
    type: String,
    default: uuid
  },
  _columnId: {
    type: String,
    default: uuid
  }
});

taskSchema.statics.toResponse = task => {
  if (!task) return {};
  const { id, title, order, description, userId } = task;
  return { id, title, order, description, userId };
};

const Task = mongoose.model('Task', taskSchema);

/* class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'string',
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    if (!task) return {};
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}*/

module.exports = Task;
