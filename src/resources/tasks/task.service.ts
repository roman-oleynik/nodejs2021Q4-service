import { Task } from "../../types/types";

const tasksRepo = require('./task.memory.repository.ts');

/**
 * Makes an async call to TasksMemoryRepository in order to
 * get an array of all Tasks by boardId from the database
 * @param boardId - the Board's id
 * @returns A promisified array of all Tasks owned by the Board
 * with the specific boardId from data.js
 */
const getAll: (boardId: string) => Task[] = (boardId) => tasksRepo.getAll(boardId);

/**
 * Makes an async call to TasksMemoryRepository in order to
 * get a Task by its id
 * @param id - the Task's id
 * @returns A promisified Task with the passed id
 */
const get: (id: string) => Task = (id) => tasksRepo.get(id);

/**
 * Makes an async call to TasksMemoryRepository in order to
 * add a Task to the database
 * @param task - The object of the Task type
 * @returns The newly added Task which is wrapped with a Promise
 */
const add: (task: Task) => Task = task => tasksRepo.add(task);

/**
 * Makes an async call to TasksMemoryRepository in order to
 * replace a Task by its id with an object of the User type
 * in the database
 * @param id - the Task's id
 * @param task - The object of the Task type
 * @returns The replaced object of the Task type
 * which is wrapped with a Promise
 */
const put: (id: string, task: Task) => Task = (id, task) => tasksRepo.put(id, task);

/**
 * Makes an async call to TasksMemoryRepository in order to
 * remove a Task by its id
 * @param id - the Task's id
 * @returns A promisified empty object
 */
const remove: (id: string) => object = (id) => tasksRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
