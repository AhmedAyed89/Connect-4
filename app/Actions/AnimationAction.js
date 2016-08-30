/**
 * Animation management (Tweenjs propriety)
 *
 **/
import EventEmitter from 'events';
import {
  ANIMATE
}
from '../Constants/GameConstants';


class AnimationAction extends EventEmitter {

  constructor (...args) {
    super(...args);

    this.data = {
      tick: 0,  //number of times render has been called
      startTime: 0, //float ms of animation time start
      currentTime: 0  //current float ms
    };

    this.data.startTime = window.performance.now();
    this.data.currentTime = window.performance.now();

    this.setMaxListeners(1000);
  }

  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.data.tick++;
    this.data.currentTime = window.performance.now();
    this.emit(ANIMATE, this.data);
  }

  addChangeListener (callback) {
    this.on(ANIMATE, callback, this.data);
  }
}

export default new AnimationAction();
