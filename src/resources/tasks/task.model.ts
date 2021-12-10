import { TaskOutput } from "../../types/types";

const uuid = require('uuid').v4;

class Task {
  id: string

  title: string

  order: string

  description: string

  userId: string

  boardId: string

  columnId: string

  constructor({
    id = uuid(),
    title = "some task",
    order = "0",
    description = "some desc",
    userId = uuid(),
    boardId = uuid(),
    columnId = uuid()
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task): TaskOutput {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
