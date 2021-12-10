import { Board } from '../../types/types';

const boardsRepo = require('./board.memory.repository');

const getAll: () => Board = () => boardsRepo.getAll();
const get: (id: string) => Board = (id) => boardsRepo.get(id);
const add: (board: Board) => Board = board => boardsRepo.add(board);
const put: (id: string, board: Board) => Board = (id, board) => boardsRepo.put(id, board);
const remove: (id: string) => object = (id) => boardsRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
