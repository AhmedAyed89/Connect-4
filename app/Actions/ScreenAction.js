/**
 *  Screen Implemention and Fix relation on change
 *
 **/
import EventEmitter from 'events';
import {
  CHANGE_SCREEN
}
from '../Constants/GameConstants';

class ScreenAction extends EventEmitter {
  constructor (...args) {
    super(...args);
    this.data = {
      previousScreen: null,
      nextScreen: null
    };
  }
  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.emit(CHANGE_SCREEN, this.data);
  }

  addChangeListener (callback) {
    this.on(CHANGE_SCREEN, callback, this.data);
  }
}
export default new ScreenAction();
