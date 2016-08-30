/**
 *  Main class to append game objects
 *
 **/

import PIXI from 'pixi.js';
import GamePage from '../Screens/GamePage.js';
import HomePage from '../Screens/HomePage.js';
import Arena from '../../Models/Arena.js';
import GameAction from '../../Actions/GameAction';
import ScreenAction from '../../Actions/ScreenAction';
import RendererAction from '../../Actions/RendererAction';
import Assets from '../../Models/Assets';
let assets = [];

export default class App extends PIXI.Container {

  constructor (config) {
    super(config.stageWidth, config.stageHeight);
    assets = config.assets;
    this.preloadAssets();
    GameAction.addChangeListener(this.newGameHandler.bind(this));
    ScreenAction.addChangeListener(this.ChangeScreenHandler.bind(this));
  }
  preloadAssets () {
    let loader = PIXI.loader;
    Assets.assetList.forEach(item => loader.add(item.name, item.fullPath));
    loader.once("complete", this.onAssetsLoaded.bind(this));
    loader.load();
  }
  onAssetsLoaded () {
    ScreenAction.set("nextScreen", new HomePage());
    ScreenAction.emitChange();
  }
  ChangeScreenHandler () {
    if (this.currentScreen != null) {
      this.removeChild(this.currentScreen);
    }
    this.currentScreen = ScreenAction.get("nextScreen");
    this.addChild(this.currentScreen);
    this.centerElement(this.currentScreen);
  }
  newGameHandler () {
    ScreenAction.set("nextScreen", new HomePage());
    ScreenAction.emitChange();
  }

  centerElement (displayObject) {
    displayObject.anchor.set(0.5, 0.5);
    const X = RendererAction.get("stageCenter");
    displayObject.x = X.x / 2;
    displayObject.y = X.y / 2;
  }
}
