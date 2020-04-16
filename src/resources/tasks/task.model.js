const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    default: 'title'
  },
  order: {
    type: Number,
    default: 0
  },
  description: String,
  userId: {
    type: String,
    default: ''
  },
  boardId: String,
  columnId: {
    type: String,
    default: ''
  }
});

taskSchema.statics.toResponse = task => {
  if (!task) return {};
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
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
