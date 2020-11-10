import PuzzleDOM from './puzzle-dom';
import {header} from './index';

const puzzleDOM: PuzzleDOM = new PuzzleDOM();

export default class PuzzleLogic {
  public newGame(size: number): void {
    puzzleDOM.boardSize = size;
    puzzleDOM.createPuzzle();
    this._addEvtListeners();
    header.resetMoves();
    header.resetTime();
    header.startTime();
  }

  private _move(item: HTMLElement): void {
    const items = puzzleDOM.puzzle.children;
    const empty = puzzleDOM.cellsArr.filter(el => el.id === '0')[0];

    const getIndexes = () => {
      const indexes = {
        itemIdx: 0,
        emptyIdx: 0
      }

      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].id) {
          indexes.itemIdx = i + 1;
        } else if (items[i].id === '0') {
          indexes.emptyIdx = i + 1;
        }
      }

      return indexes;
    };

    const soundMove = (isMute: boolean = true) => {
      const audio = new Audio();
      audio.volume = 0.3;

      audio.src = '../assets/move.mp3';

      !isMute ? audio.play() : false;
    };

    const chooseAnime = () => {
      let direction;

      const toUp = [
        { transform: 'translateY(-100%)' },
        { transform: 'translateY(0%)' }
      ];

      const toDown = [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0%)' }
      ];

      const toLeft = [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0%)' }
      ];

      const toRight = [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0%)' }
      ];

      if (coords.itemCoords.col === coords.emptyCoords.col
        && coords.itemCoords.row < coords.emptyCoords.row) {
        direction = toUp;
      } else if (coords.itemCoords.col === coords.emptyCoords.col
        && coords.itemCoords.row > coords.emptyCoords.row) {
        direction = toDown;
      } else if (coords.itemCoords.col > coords.emptyCoords.col
        && coords.itemCoords.row === coords.emptyCoords.row) {
        direction = toRight;
      } else {
        direction = toLeft;
      }

      return direction;
    }

    const swap = (item: HTMLElement, empty: HTMLElement): void => {
      const itemParent = item.parentElement;
      const emptyParent = empty.parentElement;

      item.animate(
        chooseAnime(), {
        duration: 200,
        easing: 'ease-in-out',
        iterations: 1
      });

      const itemHolder = document.createElement('div');
      const emptyHolder = document.createElement('div');

      itemParent?.replaceChild(itemHolder, item);
      puzzleDOM.puzzle.replaceChild(emptyHolder, empty);

      emptyParent?.replaceChild(item, emptyHolder);
      itemParent?.replaceChild(empty, itemHolder);
    }

    const coords = {
      itemCoords: {
        col: 0,
        row: 0
      },
      emptyCoords: {
        col: 0,
        row: 0
      }
    }

    const indexes = getIndexes();

    coords.itemCoords = puzzleDOM.calcCoords(indexes.itemIdx);
    coords.emptyCoords = puzzleDOM.calcCoords(indexes.emptyIdx);
    // console.log(indexes.itemIdx);
    // console.log(`item: ${coords.itemCoords.col} ${coords.itemCoords.row}`);
    // console.log(`empty: ${coords.emptyCoords.col} ${coords.emptyCoords.row}`);
    // console.log('');

    if (Math.abs(coords.itemCoords.col - coords.emptyCoords.col)
      + Math.abs(coords.itemCoords.row - coords.emptyCoords.row) > 1) {
      return;
    } else {
      soundMove();
      swap(item, empty);
      header.countMoves();
    }
  }

  private _addEvtListeners() {
    puzzleDOM.cellsArr.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.id !== '0') {
          this._move(item);
        }
      });
    });
  }
}
