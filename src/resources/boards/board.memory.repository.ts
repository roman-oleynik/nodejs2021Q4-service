import { Task, Board } from '../../types/types';

const { boards, tasks } = require("../../data/data");
const { removeTask } = require("../tasks/task.memory.repository");

const getAll: () => Promise<Board[]> = async () =>
  // TODO: mock implementation. should be replaced during task development
   boards
;
const get: (id: string) => Board = id => boards.find((el: Board) => el.id === id);

const add: (board: Board) => Promise<Board> = async board => {
  boards.push(board);
  return board;
};

const put: (id: string, board: Board) => Promise<Board> = async (id, board) => {
  const indexOfBoardById = boards.findIndex((el: Board) => el.id === id);
  boards[indexOfBoardById] = board;
  return board;
};

const remove: (id: string) => Promise<object> = async id => {
  const indexOfBoardById = boards.findIndex((el: Board) => el.id === id);
  if (indexOfBoardById === -1) {
    throw new Error("Board wasn't found");
  }
  boards.splice(indexOfBoardById, 1);
  tasks
    .filter((el: Task) => el.boardId === id)
    .forEach((el: Task) => removeTask(el.id));
  return {};
};
module.exports = { getAll, get, add, put, remove };
