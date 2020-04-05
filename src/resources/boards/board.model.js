const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Title',
    // eslint-disable-next-line no-unused-vars
    columns = [
      {
        id,
        // eslint-disable-next-line no-undef
        order,
        title
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [
      {
        id: uuid(),
        order: 0,
        title: 'Title'
      }
    ];
  }

  static toDB(board) {
    if (!board) return {};
    const {
      id,
      title,
      columns: [{ id: boardId, title: columnTitle, order }]
    } = board;
    return { id, title, columns: [{ id: boardId, title: columnTitle, order }] };
  }

  static toResponse(board) {
    if (!board) return {};
    const {
      title,
      columns: [{ title: columnTitle, order }]
    } = board;
    return {
      title,
      columns: [{ title: columnTitle, order }]
    };
  }
}

module.exports = Board;
