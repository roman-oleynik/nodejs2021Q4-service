import { User } from '../../types/types';

const usersRepo = require('./user.memory.repository');

/**
 * Makes an async call to UsersMemoryRepository in order to
 * get an array of all Users from the database
 * @returns A promisified array of all Users from data.js
 */
const getAll: () => Promise<User[]> = async () => usersRepo.getAll();

/**
 * Makes an async call to UsersMemoryRepository in order to
 * get a User by its id
 * @param id - the User's id
 * @returns A promisified User with the passed id
 */
const get: (id: string) => Promise<User> = async (id) => usersRepo.get(id);

/**
 * Makes an async call to UsersMemoryRepository in order to
 * add a User to the database
 * @param user - The object of the User type
 * @returns The newly added User which is wrapped with a Promise
 */
const add: (user: User) => Promise<User> = async user => usersRepo.add(user);

/**
 * Makes an async call to UsersMemoryRepository in order to
 * replace a User by its id with an object of the User type
 * in the database
 * @param id - the User's id
 * @param user - The object of the User type
 * @returns The replaced object of the User type
 * which is wrapped with a Promise
 */
const put: (id: string, user: User) => Promise<User> = async (id, user) => usersRepo.put(id, user);

/**
 * Makes an async call to UsersMemoryRepository in order to
 * remove a User by its id
 * @param id - the User's id
 * @returns A promisified empty object
 */
const remove: (id: string) => Promise<object> = async (id) => usersRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
