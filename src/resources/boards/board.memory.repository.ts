import { Task, Board, CRUD } from '../../types/types';

const { boards, tasks } = require("../../data/data.ts");
const { remove } = require("../tasks/task.memory.repository.ts");

/**
 * Object that is responsible for working with Boards in the data.js file
 */
const BoardsMemoryRepository: CRUD<Board> = {
  getAll() {
    return [...boards];
  },
  /**
   * Returns a Board by its id
   * @param id - the Board's id
   * @returns A Board with the passed id
   */
  get(id) {
    return boards.find((el: Board) => el.id === id);
  },
  /**
   * Adds a Board to data.js
   * @param user - The object of the Board type
   * @returns The newly added Board
   */
  add(board) {
    boards.push(board);
    return board;
  },
  /**
   * Replaces a Board by its id with an object of the Board type in data.js
   * @param id - the Board's id
   * @param user - The object of the Board type
   * @returns The replaced object of the Board type
   */
  put(id, board) {
    const indexOfBoardById = boards.findIndex((el: Board) => el.id === id);
    boards[indexOfBoardById] = board;
    return board;
  },
  /**
   * Removes a Board by its id and all its Tasks in data.js
   * @param id - The Board's id
   * @returns An empty object
   */
  remove(id) {
    const indexOfBoardById = boards.findIndex((el: Board) => el.id === id);
    if (indexOfBoardById === -1) {
      throw new Error("Board wasn't found");
    }
    boards.splice(indexOfBoardById, 1);
    tasks
      .filter((el: Task) => el.boardId === id)
      .forEach((el: Task) => remove(el.id));
    return {};
  }
}

module.exports = BoardsMemoryRepository;
