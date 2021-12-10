import { Task } from '../../types/types';

const { tasks } = require("../../data/data");

const getAllByBoardId: (id: string) => Promise<Task[]> = async (id) => tasks.filter((el: Task) => el.boardId === id)
;
const get: (id: string) => Task = id => tasks.find((el: Task) => el.id === id);

const add: (task: Task) => Promise<Task> = async task => {
  tasks.push(task);
  return task;
};

const put: (id: string, task: Task) => Promise<Task> = async (id, task) => {
  const indexOfTaskById: number | undefined = tasks.findIndex((el: Task) => el.id === id);
  if (indexOfTaskById) {
    tasks[indexOfTaskById] = task;
  } else {
    throw new Error("The task isn't found");
  }
  return task;
};


const removeTask: (id: string) => Promise<object> = async id => {
  const indexOfTaskById: number | undefined = tasks.findIndex((el: Task) => el.id === id);
  if (indexOfTaskById === -1) {
    throw new Error("Task wasn't found");
  }
  tasks.splice(indexOfTaskById, 1);
  return {};
};


module.exports = { getAllByBoardId, get, add, put, removeTask };
