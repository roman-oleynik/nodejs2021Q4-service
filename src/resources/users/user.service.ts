import { User } from '../../types/types';

const usersRepo = require('./user.memory.repository');

const getAll: () => User[] = () => usersRepo.getAll();
const get: (id: string) => User = (id) => usersRepo.get(id);
const add: (user: User) => User = user => usersRepo.add(user);
const put: (id: string, user: User) => User = (id, user) => usersRepo.put(id, user);
const remove: (user: User) => void = (id) => usersRepo.remove(id);

module.exports = { getAll, get, add, put, remove };
