import { Board } from '../../types/types';

const boardsRepo = require('./board.memory.repository.ts');

/**
 * Makes an async call to BoardsMemoryRepository in order to
 * get an array of all Board from the database
 * @returns A promisified array of all Boards from data.js
 */
const getAll: () => Promise<Board[]> = async () => boardsRepo.getAll();

/**
 * Makes an async call to BoardsMemoryRepository in order to
 * get a Board by its id
 * @param id - the Board's id
 * @returns A promisified Board with the passed id
 */
const get: (id: string) => Promise<Board> = async (id) => boardsRepo.get(id);

/**
 * Makes an async call to BoardsMemoryRepository in order to
 * add a Board to the database
 * @param board - The object of the Board type
 * @returns The newly added Board which is wrapped with a Promise
 */
const add: (board: Board) => Promise<Board> = async board => boardsRepo.add(board);

/**
 * Makes an async call to BoardsMemoryRepository in order to
 * replace a Board by its id with an object of the Board type
 * in the database
 * @param id - the Board's id
 * @param board - The object of the Board type
 * @returns The replaced object of the Board type
 * which is wrapped with a Promise
 */
const put: (id: string, board: Board) => Promise<Board> = async (id, board) => boardsRepo.put(id, board);

/**
 * Makes an async call to BoardsMemoryRepository in order to
 * remove a Board by its id
 * @param id - the Board's id
 * @returns A promisified empty object
 */
const remove: (id: string) => Promise<object> = async (id) => boardsRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
