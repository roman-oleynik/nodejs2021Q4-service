const { boards, tasks } = require("../../data/data");
const { removeTask } = require("../tasks/task.memory.repository");

const getAll = async () => 
  // TODO: mock implementation. should be replaced during task development
   boards
;
const get = id => boards.find(el => el.id === id);

const add = async board => {
  boards.push(board);
  return board;
};

const put = async (id, board) => {
  const indexOfBoardById = boards.findIndex(el => el.id === id);
  boards[indexOfBoardById] = board;
  return board;
};

const remove = async id => {
  const indexOfBoardById = boards.findIndex(el => el.id === id);
  if (indexOfBoardById === -1) {
    throw new Error("Board wasn't found");
  }
  boards.splice(indexOfBoardById, 1);
  tasks
    .filter(el => el.boardId === id)
    .forEach(el => removeTask(el.id));
  return {};
};
module.exports = { getAll, get, add, put, remove };
