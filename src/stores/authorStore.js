import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
//author store initializing to an empty array
let _authors = [];

//Store listeners
class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.find((author) => author.id === id);
  }
}

const authorStore = new AuthorStore();

//Register actions
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter(
        (author) => author.id !== parseInt(action.id, 10)
      );
      authorStore.emitChange();
      break;
    case actionTypes.CREATE_AUTHOR:
      _authors = [..._authors, action.author];
      authorStore.emitChange();
      break;
    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((author) =>
        author.id === action.author.id ? action.author : author
      );
      authorStore.emitChange();
      break;
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      authorStore.emitChange();
      break;

    default:
  }
});

export default authorStore;
