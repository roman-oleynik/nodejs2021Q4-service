import { Column, BoardOutput, Board } from '../../types/types';

const uuid = require('uuid').v4;

const nullBoard: Board = { id: "", title: "", columns: [] };

/**
 * Class that is responsible for creating objects with type Board
 * and outputting them safely by hiding fields that are redundant for reading
 * (there are not such ones in the implementation).
 * @param user - the object of the User type
 * (with properties: id, title, columns)
 */
class BoardCreator {
  id: string

  title: string

  columns: Column[]

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
  }: Board = nullBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Safely returns a Board (without any redundant fields)
   * @param board - the object of the Task class
   * @returns A Task without the password field
   */
  static toResponse(board: Board): BoardOutput {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = BoardCreator;
