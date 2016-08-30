/**
 * App.js
 *
 **/

import './index.html';
import {	config	} from '../package.json';
import Dir from './LoopGame/LoopGame';
import App from './Viewers/Connect4/App';
import AnimationAction from './Actions/AnimationAction';
import TWEEN from 'tween.js';

const dirLoop = new Dir(config.stageWidth, config.stageHeight);
const app = new App(config);

document.body.appendChild(dirLoop.view);

AnimationAction.addChangeListener(() => TWEEN.update());
dirLoop.setClearColor(parseInt(config.BackgroundColor));
dirLoop.addRenderable(app);
dirLoop.start();
