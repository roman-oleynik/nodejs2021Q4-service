import { User, Task, CRUD } from '../../types/types';

const { users, tasks } = require("../../data/data.ts");

/**
 * Object that is responsible for working with Users in the data.js file
 */
const UsersMemoryRepository: CRUD<User> = {
  /**
   * Returns an array of all Users from data.js
   * @returns An array of all Users from data.js
   */
  getAll() {
    return [...users];
  },
  /**
   * Returns a User by its id
   * @param id - the User's id
   * @returns A User with the passed id
   */
  get(id) {
    return users.find((el: User) => el.id === id);
  },
  /**
   * Adds a User to data.js
   * @param user - The object of the User type
   * @returns The newly added User
   */
  add(user) {
    users.push(user);
    return user;
  },
  /**
   * Replaces a User by its id with an object of the User type in data.js
   * @param id - the User's id
   * @param user - The object of the User type
   * @returns The replaced object of the User type
   */
  put(id, user) {
    const indexOfUserById = users.findIndex((el: User) => el.id === id);
    users[indexOfUserById] = user;
    return user;
  },
  /**
   * Removes a User by its id from data.js and nullifies the userId field
   * in all Tasks that are bound to the User
   * @param id - The User's id
   * @returns An empty object
   */
  remove(id) {
    const indexOfUserById = users.findIndex((el: User) => el.id === id);
    users.splice(indexOfUserById, 1);
    tasks.forEach((el: Task) => {
      if (el.userId === id) {
        const item = el;
        item.userId = null;
      }
    })
    return {};
  }
}

module.exports = UsersMemoryRepository;
