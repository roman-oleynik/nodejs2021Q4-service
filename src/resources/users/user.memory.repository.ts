import { User, Task } from '../../types/types';

const { users, tasks } = require("../../data/data");

const getAll: () => Promise<User[]> = async () =>
  // TODO: mock implementation. should be replaced during task development
   [...users]
;

const get: (id: string) => User = id => users.find((el: User) => el.id === id);

const add: (user: User) => Promise<User> = async user => {
  users.push(user);
  return user;
};

const put: (id: string, user: User) => Promise<User> = async (id, user) => {
  const indexOfUserById = users.findIndex((el: User) => el.id === id);
  users[indexOfUserById] = user;
  return user;
};

const remove: (id: string) => Promise<object> = async id => {
  const indexOfUserById = users.findIndex((el: User) => el.id === id);
  users.splice(indexOfUserById, 1);
  tasks.forEach((el: Task) => {
    if (el.userId === id) {
      const item = el;
      item.userId = null;
    }
  })
  return {};
};

module.exports = { getAll, get, add, put, remove };
