/**
 *  Initiation of variables used for the game
 *
 **/
import EventEmitter from 'events';
import {
  RESIZE
}
from '../Constants/GameConstants';

class RendererAction extends EventEmitter {

  constructor (...args) {
    super(...args);

    this.data = {
      width: 0, //window width
      backgroundColor: "0xFFFFFF",
      height: 0,  //window height
      stageWidth: 0,  //stage width
      stageHeight: 0, //stage height
      stageCenter: {
        x: 0,
        y: 0
      },
      resolution: 1 //display density
    };
  }

  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.emit(RESIZE, this.data);
  }

  addChangeListener (callback) {
    this.on(RESIZE, callback, this.data);
  }
}

export default new RendererAction();
