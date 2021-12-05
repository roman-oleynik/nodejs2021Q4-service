const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = (id) => tasksRepo.getAllByBoardId(id);
const get = (id) => tasksRepo.get(id);
const add = board => tasksRepo.add(board);
const put = (id, board) => tasksRepo.put(id, board);

const removeTask = (id) => tasksRepo.removeTask(id);

module.exports = { getAllByBoardId, get, add, put, removeTask };
