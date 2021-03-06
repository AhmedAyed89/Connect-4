/**
 *  Initiation of a new game (useful to refreash)
 *
 **/
import EventEmitter from 'events';
import {
  NEW_GAME
}
from '../Constants/GameConstants';

class GameAction extends EventEmitter {
  constructor (...args) {
    super(...args);
    this.data = {};
  }
  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.emit(NEW_GAME, this.data);
  }

  addChangeListener (callback) {
    this.on(NEW_GAME, callback, this.data);
  }
}
export default new GameAction();
