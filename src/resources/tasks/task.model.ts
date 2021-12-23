import { TaskOutput, Task } from "../../types/types";

const uuid = require('uuid').v4;

const nullTask: Task = {
  id: uuid(),
  title: "some task",
  order: "0",
  description: "some desc",
  userId: uuid(),
  boardId: uuid(),
  columnId: uuid()
}

/**
 * Class that is responsible for creating objects with type Task
 * and outputting them safely by hiding fields that are redundant for reading
 * (there are not such ones in the implementation).
 * @param task - the object of the User type
 * (with properties: id, title, order, description, userId, boardId, columnId)
 */
class TaskCreator {
  id: string

  title: string

  order: string

  description: string

  userId: string | null

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
  }: Task = nullTask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Safely returns a Task (without any redundant fields)
   * @param task - the object of the Task class
   * @returns A Task without the password field
   */
  static toResponse(task: Task): TaskOutput {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = TaskCreator;
