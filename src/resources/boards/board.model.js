const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      {
          id: uuid(),
          title: "todo",
          order: "0"
      },
      {
          id: uuid(),
          title: "done",
          order: "1"
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
