const uuid = require('uuid');

class User {
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

  static toDB(user) {
    if (!user) return {};
    const { id, name, login, password } = user;
    return { id, name, login, password };
  }

  static toResponse(user) {
    if (!user) return {};
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
