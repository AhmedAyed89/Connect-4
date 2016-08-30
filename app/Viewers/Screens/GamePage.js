/**
 *	Implementation of the Game page by declaring them as a sprite to appends the element of the Scene.
 *
 **/
import PIXI from 'pixi.js';
import StateGame from '../../Actions/StateGame';
import GameAction from '../../Actions/GameAction';
import AnimationAction from '../../Actions/AnimationAction';
import { config } from '../../../package.json';
import {
	NEW_GAME, PIKACHU, JIGGLYPUFF, START, PIKACHU_TURN, JIGGLYPUFF_TURN, ARENA_SPACE, ARENA_SIZE, WIN_SITUATION, ARENA_TOTAL, ANIMATE
}
from "../../Constants/GameConstants";
const winIMG = 'win';
const pikachuIMG = 'pikachu';
const jigglypuffIMG = 'jigglypuff';
const boxIMG = 'box';
const Sprite = PIXI.Sprite;
const Texture = PIXI.Texture;
const animOffset = 20;
let animPosition = 0;

export default class GamePage extends Sprite {
	constructor(arena) {
		super();
		this.arena = arena;
		this.boundAnimationListener = this.onAnimationChangeHandler.bind(this);
		this.boundGameStateListener = this.onGameStateChangeHandler.bind(this);
		this.renderPIXIArenaBackground(arena);
		this.renderPIXIArena(arena);
		StateGame.set("type", PIKACHU_TURN);
		StateGame.addChangeListener(this.boundGameStateListener);
		AnimationAction.addChangeListener(this.boundAnimationListener);
	}
	onAnimationChangeHandler() {
		this.animatePiece();
	}
	onGameStateChangeHandler() {
		this.arena.playAtColWithValue(StateGame.get("col"), StateGame.get("type"));
	}
	onPieceMouseDown(e) {
		let playingNow = StateGame.get("type");
		const {
			target
		} = e;
		const {
			isAnimating, result
		} = this.arena;
		if (result) {
			return;
		}
		if (playingNow !== PIKACHU_TURN || isAnimating) {
			return;
		}
		if (!this.arena.canPlayAt(target.col)) {
			return;
		}
		StateGame.set("type", PIKACHU_TURN);
		StateGame.set("col", target.col);
		StateGame.emitChange();
	}
	getTextureByValue(type) {
		let img;

		switch (type) {
			default:
				case 0:
				img = boxIMG;
			break;
			case 1:
					img = pikachuIMG;
				break;
			case 2:
					img = jigglypuffIMG;
				break;
			case 3:
					img = winIMG;
				break;
		}
		return new Texture.fromImage(PIXI.loader.resources[img].url);
	}
	playWithJigglypuff(arena) {
		setTimeout(() => {
			const col = Math.floor((Math.random() * ARENA_SIZE));
			if (!arena.canPlayAt(col)) {
				this.playWithJigglypuff(arena);
				return;
			}

			StateGame.set("type", JIGGLYPUFF_TURN);
			StateGame.set("col", col);
			StateGame.emitChange();
		}, 800);
	}
	animatePiece() {
		let playingNow = StateGame.get("type");

		const {
			animatedPiece, isAnimating
		} = this.arena;

		if (!isAnimating || animatedPiece === null) {
			return;
		}
		let pieceSprite = this.getChildByName(animatedPiece.name);
		const texture = this.getTextureByValue(animatedPiece.value);
		if (pieceSprite === null) {
			pieceSprite = new Sprite(texture);
			this.addChild(pieceSprite);
		} else {
			pieceSprite.texture = texture;
		}

		if (!pieceSprite.movingDirection) {
			pieceSprite.movingDirection = {
				from: animatedPiece.from,
				to: animatedPiece.to,
			};

			animPosition = pieceSprite.movingDirection.from.y;
			pieceSprite.name = animatedPiece.name;
			pieceSprite.x = pieceSprite.movingDirection.from.x;
		}

		if (animPosition > pieceSprite.movingDirection.to.y) {
			delete pieceSprite.movingDirection;
			this.arena.isAnimating = false;

			if (this.arena.gameHasFinished(animatedPiece.value)) {
				this.renderNewGame(this.arena);
				return;
			}
			playingNow = playingNow === PIKACHU_TURN ? JIGGLYPUFF_TURN : PIKACHU_TURN;
			StateGame.set("type", playingNow);

			if (playingNow === JIGGLYPUFF_TURN && !this.arena.result) {
				this.playWithJigglypuff(this.arena);
			}
			return;
		}
		pieceSprite.visible = true;
		pieceSprite.y = animPosition;
		animPosition += animOffset;
	}
	renderNewGame(arena) {
		this.renderPIXIArena(arena);
		const playingNow = StateGame.get('type');
		let playerNameValue = 'Pikachu';
		if(playingNow !== PIKACHU_TURN){
			playerNameValue = 'Jigglypuff';
		}
		const text = config.texts.result_text.replace("{playerName}", playerNameValue);
		const resultText = new PIXI.Text(text, {
			font: 'bold 68px Arial',
			fill: 0x003366
		});
		resultText.x = this.parent.width/2 - resultText.width/2;
		resultText.y = 0;
		this.addChild(resultText);
		this.reset();
	}
	reset() {
		setTimeout(() => {
			StateGame.removeListener(START, this.boundGameStateListener);
			AnimationAction.removeListener(ANIMATE, this.boundAnimationListener);
			GameAction.emitChange();
		}, 2000);
	}
	renderPIXIArenaBackground(arena) {
		for (let row = 0; row < ARENA_SIZE; row++) {
			for (let col = 0; col < ARENA_SIZE; col++) {
				const piece = arena.getPieceAt(row, col);
				let texture = this.getTextureByValue(0);
				let pieceSprite = new Sprite(texture);
				pieceSprite.x = piece.x;
				pieceSprite.y = piece.y;
				pieceSprite.row = row;
				pieceSprite.col = col;
				pieceSprite.name = "empty" + col + "-" + row;
				pieceSprite.interactive = true;
				pieceSprite.visible = true;
				pieceSprite.mousedown = (e) => {
					this.onPieceMouseDown(e);
				};
				this.addChild(pieceSprite);
			}
		}
	}
	renderPIXIArena(arena) {
		for (let row = 0; row < ARENA_SIZE; row++) {
			for (let col = 0; col < ARENA_SIZE; col++) {
				const piece = arena.getPieceAt(row, col);
				const pieceValue = piece.value;
				let texture = this.getTextureByValue(pieceValue);
				if (arena.isAnimatedPiece(row, col)) {
					texture = this.getTextureByValue(0);
				}
				if (texture === winIMG) {
					continue;
				}
				let pieceSprite = this.getChildByName(piece.name);
				if (pieceSprite !== null) {
					this.removeChild(pieceSprite);
				}
				pieceSprite = new Sprite(texture);
				pieceSprite.x = piece.x;
				pieceSprite.y = piece.y;
				pieceSprite.row = row;
				pieceSprite.col = col;
				pieceSprite.name = piece.name;
				pieceSprite.interactive = true;
				pieceSprite.visible = true;
				pieceSprite.mousedown = (e) => {
					this.onPieceMouseDown(e);
				};
				this.addChild(pieceSprite);
			}
		}
	}
}
