/**
 *  Manages loop animation
 *
 */
import PIXI from 'pixi.js';
import RendererAction from '../Actions/RendererAction';
import AnimationAction from '../Actions/AnimationAction';

const renderables = new Set();


export default class LoopGame extends PIXI.WebGLRenderer {

  constructor (...args) {

      super(...args);

      RendererAction.set('resolution', this.resolution);
      RendererAction.set('stageWidth', args[0]);
      RendererAction.set('stageHeight', args[1]);
      RendererAction.set('stageCenter', new PIXI.Point(args[0] / 2, args[1] / 2));
      this.setStore();
    }

  setClearColor (color) {
      this.backgroundColor = color;
    }
  setStore () {
    RendererAction.set('width', this.getWindowSize()[0]);
    RendererAction.set('height', this.getWindowSize()[1]);
  }

  resizeHandler () {
    this.resize(...this.getWindowSize());
    this.setStore();
    RendererAction.emitChange();
  }

  getWindowSize () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return [width, height];
  }

  start () {
    this.active = true;
    window.requestAnimationFrame(this.animate.bind(this));
  }
  stop () {
    this.active = false;
  }
  animate () {
    this.renderRenderables();

    if (this.active) {
      window.requestAnimationFrame(this.animate.bind(this));
      AnimationAction.emitChange();
    }
  }
  addRenderable (renderable) {
    return renderables.add(renderable);
  }
  removeRenderable (renderable) {
    let hasRenderable = renderables.has(renderable);

    if (hasRenderable) {
      renderables.delete(renderable);
    }

    return hasRenderable;
  }
  renderRenderables () {
    for (let entry of renderables) {
      this.render(entry);
    }
  }

}
