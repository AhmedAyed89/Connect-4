/**
 *  Rules and cheking the four connection in the arena
 *
 **/

import { expect } from 'chai';
import { PIKACHU_TURN, JIGGLYPUFF_TURN, ARENA_SIZE } from '../app/Constants/GameConstants';
import Arena from '../app/Models/Arena';

describe('Arena', () => {
  const arena = new Arena();

  describe('initiate', () => {
    it('should be able to play at col 0', () => {
      arena.initiate();
      expect(arena).to.have.property('pieces');
      expect(arena).to.have.property('result');
      expect(arena).to.have.property('animatedPiece');
      expect(arena).to.have.property('isAnimating');
      expect(Object.keys(arena.pieces)).to.have.length(ARENA_SIZE * ARENA_SIZE);
      expect(arena.result).to.be.equal(null);
      expect(arena.animatedPiece).to.be.equal(null);
      expect(arena.isAnimating).to.be.equal(false);
    });
  });

  describe('playAtColWithValue', () => {
    it(`${PIKACHU_TURN} play first`, () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      expect(arena.getPieceAt(0, 0)).to.have.property('value');
      expect(arena.getPieceAt(0 ,0).value).to.be.equal(PIKACHU_TURN);
    });
  });

  describe('animatedPiece', () => {
    it(`start animation for ${PIKACHU_TURN} turns`, () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      const { animatedPiece } = arena;
      expect(animatedPiece).to.have.property('row');
      expect(animatedPiece).to.have.property('col');
      expect(animatedPiece).to.have.property('value');
      expect(animatedPiece.row).to.be.equal(0);
      expect(animatedPiece.col).to.be.equal(0);
      expect(animatedPiece.value).to.be.equal(PIKACHU_TURN);
    });

    it('Animation = true', () => {
      expect(arena.isAnimatedPiece(0, 0)).to.be.equal(true);
    });

    it('Aniamtion = false for row = 0 and col = 1', () => {
      expect(arena.isAnimatedPiece(0, 1)).to.be.equal(false);
    });
  });

  describe('canPlayAt', () => {
    it('should be able to play at col 0', () => {
      arena.initiate();
      expect(arena.canPlayAt(0)).to.be.equal(true);
    });

    it('should not be able to play at col 0', () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(0, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(0, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(0, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);

      expect(arena.canPlayAt(0)).to.be.equal(false);
    });
  });

  describe('gameHasFinished', () => {
    it('should have game finished', () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(0, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(1, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(2, PIKACHU_TURN);
      arena.playAtColWithValue(2, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);

      const expected = arena.gameHasFinished(PIKACHU_TURN);
      const { result } = arena;

      expect(expected).to.be.equal(true);
      expect(result).to.have.property('type');
      expect(result).to.have.property('game');
      expect(result.type).to.be.equal(PIKACHU_TURN);
      expect(result.game).to.have.length(4);
    });

    it('should finish game horizontally', () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(0, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(1, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(2, PIKACHU_TURN);
      arena.playAtColWithValue(2, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);

      expect(arena.gameHasFinishedHorizontally(0, 0, PIKACHU_TURN)).to.not.be.equal(null);
    });

    it('should finish game vertically', () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(0, PIKACHU_TURN);

      expect(arena.gameHasFinishedVertically(0, 0, PIKACHU_TURN)).to.not.be.equal(null);
    });

    it('should finish game gameHasFinishedDiagonallyAsc', () => {
      arena.initiate();
      arena.playAtColWithValue(0, PIKACHU_TURN);
      arena.playAtColWithValue(1, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(1, PIKACHU_TURN);
      arena.playAtColWithValue(2, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(2, PIKACHU_TURN);
      arena.playAtColWithValue(3, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(2, PIKACHU_TURN);
      arena.playAtColWithValue(3, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);
      arena.playAtColWithValue(4, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);

      expect(arena.gameHasFinishedDiagonallyAsc(0, 0, PIKACHU_TURN)).to.not.be.equal(null);
    });

    it('should finish game gameHasFinishedDiagonallyDesc', () => {
      arena.initiate();
      arena.playAtColWithValue(6, PIKACHU_TURN);
      arena.playAtColWithValue(5, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(5, PIKACHU_TURN);
      arena.playAtColWithValue(4, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(4, PIKACHU_TURN);
      arena.playAtColWithValue(3, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(4, PIKACHU_TURN);
      arena.playAtColWithValue(3, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);
      arena.playAtColWithValue(2, JIGGLYPUFF_TURN);
      arena.playAtColWithValue(3, PIKACHU_TURN);

      expect(arena.gameHasFinishedDiagonallyDesc(0, 6, PIKACHU_TURN)).to.not.be.equal(null);
    });
  });
});
