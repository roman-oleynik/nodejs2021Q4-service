const { tasks } = require("../../data/data");

const getAllByBoardId = async (id) => tasks.filter(el => el.boardId === id)
;
const get = id => tasks.find(el => el.id === id);

const add = async task => {
  tasks.push(task);
  return task;
};

const put = async (id, task) => {
  const indexOfTaskById = tasks.findIndex(el => el.id === id);
  tasks[indexOfTaskById] = task;
  return task;
};


const removeTask = async id => {
  const indexOfTaskById = tasks.findIndex(el => el.id === id);
  if (indexOfTaskById === -1) {
    throw new Error("Task wasn't found");
  }
  tasks.splice(indexOfTaskById, 1);
  return {};
};


module.exports = { getAllByBoardId, get, add, put, removeTask };
