/**
 *	Implementation of the Home page by declaring them as a sprite to appends the element of the Scene.
 *
 **/
import PIXI from 'pixi.js';
import ScreenAction from '../../Actions/ScreenAction';
import GamePage from './GamePage.js';
import Arena from '../../Models/Arena.js';
import { config } from '../../../package.json';
const Sprite = PIXI.Sprite;
const pokeballIMG = 'pokeball';
const vsIMG = 'vs';

export default class HomePage extends Sprite {

	constructor() {
		super();
		this.renderUI();
	}

	renderUI() {
		this.pokeball = new Sprite.fromImage(PIXI.loader.resources[pokeballIMG].url);
		this.vs = new Sprite.fromImage(PIXI.loader.resources[vsIMG].url);
		this.addChild(this.pokeball);
		this.addChild(this.vs);
		this.vs.y = this.pokeball.height - 600;
		this.vs.x = this.pokeball.width / 2 - this.vs.width / 2;
		this.pokeball.buttonMode = true;
		this.pokeball.interactive = true;
		this.pokeball.mouseup = this.playButtonClickHandler;
		const pokeballTitleText = new PIXI.Text(config.texts.pokeball_title, {
			font: 'bold 60px Arial',
			fill: 0xffffff,
			align: 'center'
		});
		this.pokeball.addChild(pokeballTitleText);

		pokeballTitleText.x = this.pokeball.width / 2 - pokeballTitleText.width / 2;
		pokeballTitleText.y = this.pokeball.height / 4 - pokeballTitleText.height / 2;

		const pokeballText = new PIXI.Text(config.texts.pokeball_desc, {
			font: '20px Arial',
			fill: 0x3e3e3e,
			align: 'center'
		});
		this.pokeball.addChild(pokeballText);

		pokeballText.x = this.pokeball.width / 2 - pokeballText.width / 2;
		pokeballText.y = this.pokeball.height / (3/2);
	}
	playButtonClickHandler(mouseData){
		const arena = new Arena();
		const gamePage = new GamePage(arena);
		ScreenAction.set("nextScreen", gamePage);
		ScreenAction.emitChange();
	}
}
