const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({
    id = uuid(),
    title = 'Title',
    columns = [new Column(), new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toDB(board) {
    if (!board) return {};
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns
    };
  }

  static toResponse(board) {
    if (!board) return {};
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns
    };
  }
}

module.exports = Board;
