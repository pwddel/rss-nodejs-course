const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'Title', columns = new Column() } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toDB(board) {
    if (!board) return {};
    const {
      id,
      title,
      columns: [{ id: ColumnId, title: columnTitle, order }]
    } = board;
    return {
      id,
      title,
      columns: [{ id: ColumnId, title: columnTitle, order }]
    };
  }

  static toResponse(board) {
    if (!board) return {};
    const {
      id,
      title,
      columns: [{ id: ColumnId, title: columnTitle, order }]
    } = board;
    return {
      id,
      title,
      columns: [{ id: ColumnId, title: columnTitle, order }]
    };
  }
}

module.exports = Board;
