
Object.defineProperty(exports, "__esModule", { value: true });
const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = (id) => tasksRepo.getAllByBoardId(id);
const get = (id) => tasksRepo.get(id);
const add = task => tasksRepo.add(task);
const put = (id, task) => tasksRepo.put(id, task);
const removeTask = (id) => tasksRepo.removeTask(id);
module.exports = { getAllByBoardId, get, add, put, removeTask };
