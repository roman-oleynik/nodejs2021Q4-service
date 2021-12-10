import { UserOutput } from '../../types/types';

const uuid = require('uuid').v4;

class User {
  id: string

  name: string

  login: string

  password: string

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): UserOutput {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports =  User;
