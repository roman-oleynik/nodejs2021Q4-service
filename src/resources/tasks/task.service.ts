import { Task } from "../../types/types";

const tasksRepo = require('./task.memory.repository');

const getAllByBoardId: (id: string) => Task[] = (id) => tasksRepo.getAllByBoardId(id);
const get: (id: string) => Task = (id) => tasksRepo.get(id);
const add: (task: Task) => Task = task => tasksRepo.add(task);
const put: (id: string, task: Task) => Task = (id, task) => tasksRepo.put(id, task);

const removeTask: (id: string) => object = (id) => tasksRepo.removeTask(id);

module.exports = { getAllByBoardId, get, add, put, removeTask };
