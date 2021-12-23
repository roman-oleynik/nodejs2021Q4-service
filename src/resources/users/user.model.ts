import { UserOutput, User } from '../../types/types';

const uuid = require('uuid').v4;

const nullUser: User = { id: "", name: "", login: "", password: "" };

/**
 * Class that is responsible for creating objects with type User
 * and outputting them safely by hiding their password.
 * @param user - the object of the User type
 * (with properties: id, name, login, password)
 */
class UserCreator {
  id: string

  name: string

  login: string

  password: string

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: User = nullUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Safely returns a User (without the password field)
   * @param user - the object of the User class
   * @returns A User without the password field
   */
  static toResponse(user: User): UserOutput {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = UserCreator;
