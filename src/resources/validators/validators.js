const { validate } = require('uuid');

const isUserValid = (person) => {
    if (!validate(person.id) && person.boardId !== null) {
        return false;
    }
    if (!person.name) {
        return false;
    }
    if (!person.login) {
        return false;
    }
    if (!person.password) {
        return false;
    }
    return true;
  };
  
  const isBoardValid = (person) => {
    if (!validate(person.id)) {
        return false;
    }
    if (!person.title) {
        return false;
    }
    if (!person.columns) {
        return false;
    }
    return true;
  };
  
  const isTaskValid = (person) => {
    if (!validate(person.id)) {
        return false;
    }
    if (!person.title) {
        return false;
    }
    if (!person.order && typeof person.order !== "number") {
        return false;
    }
    if (!person.description) {
      return false;
    }
    if (!person.userId && person.userId !== null) {
      return false;
    }
    if (!person.boardId && person.boardId !== null) {
      return false;
    }
    return true;
  };

  module.exports = {
      isBoardValid,
      isTaskValid,
      isUserValid
  }