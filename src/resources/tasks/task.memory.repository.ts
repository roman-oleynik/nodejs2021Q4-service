import { Task, CRUD } from '../../types/types';

const { tasks } = require("../../data/data");

/**
 * Object that is responsible for working with Tasks in the data.js file
 */
const TasksMemoryRepository: CRUD<Task> = {
  /**
   * Returns an array of all Tasks by boardId from data.js
   * @returns An array of all Tasks by boardId from data.js
   */
  getAll(id) {
    return tasks.filter((el: Task) => el.boardId === id);
  },
  /**
   * Returns a Task by its id
   * @param id - the Task's id
   * @returns A Task with the passed id
   */
  get(id) {
    return tasks.find((el: Task) => el.id === id);
  },
  /**
   * Adds a Task to data.js
   * @param user - The object of the Task type
   * @returns The newly added Task
   */
  add(task) {
    tasks.push(task);
    return task;
  },
  /**
   * Replaces a Task by its id with an object of the User type in data.js
   * @param id - the Task's id
   * @param user - The object of the Task type
   * @returns The replaced object of the Task type
   */
  put(id, task) {
    const indexOfTaskById: number | undefined = tasks.findIndex((el: Task) => el.id === id);
    if (indexOfTaskById) {
      tasks[indexOfTaskById] = task;
    } else {
      throw new Error("The task isn't found");
    }
    return task;
  },
  /**
   * Removes a Task by its id in data.js
   * @param id - The Task's id
   * @returns An empty object
   */
  remove(id) {
    const indexOfTaskById: number | undefined = tasks.findIndex((el: Task) => el.id === id);
    if (indexOfTaskById === -1) {
      throw new Error("Task wasn't found");
    }
    tasks.splice(indexOfTaskById, 1);
    return {};
  }
}

module.exports = TasksMemoryRepository;