/**
 *  cheking the state of the game
 *
 **/

import EventEmitter from 'events';
import {
  START
}
from '../Constants/GameConstants';

class StateGame extends EventEmitter {
  constructor (...args) {
    super(...args);
    this.data = {
      type: 1,
      col: 0
    };
  }
  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.emit(START, this.data);
  }

  addChangeListener (callback) {
    this.on(START, callback, this.data);
  }
}
export default new StateGame();
