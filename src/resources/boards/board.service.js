const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = (id) => boardsRepo.get(id);
const add = board => boardsRepo.add(board);
const put = (id, board) => boardsRepo.put(id, board);
const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
