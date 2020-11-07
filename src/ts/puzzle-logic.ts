import PuzzleDOM from './puzzle-dom';

const puzzleDOM = new PuzzleDOM();

export default class PuzzleLogic {
  constructor(size: number) {
    puzzleDOM.boardSize = size;

    do {
      puzzleDOM.createDOM();
    } while (!this._isSovlable());

    this._addEvtListeners();
  }

  private _calcCoords(idx: any) {
    const puzzleWidth = puzzleDOM.puzzle.clientWidth;
    const puzzleItemWidth = puzzleDOM.puzzle.children[0].clientWidth;
    const totalCols = Math.floor(puzzleWidth / puzzleItemWidth);

    return {
      col: idx % totalCols === 0 ? totalCols : idx % totalCols,
      row: Math.ceil(idx / totalCols)
    }
  };

  private _isSovlable() {
    const puzzleLength: number = puzzleDOM.numArr.length - 1;
    let sum: number = 0;
    let zeroIdx: number = 0;

    for (let i = 0; i < puzzleLength; i++) {
      if (puzzleDOM.numArr[i] !== 0) {
        for (let j = i + 1; j <= puzzleLength; j++) {
          if (puzzleDOM.numArr[i] > puzzleDOM.numArr[j] && puzzleDOM.numArr[j] !== 0) {
            sum++;
          }
        }
      } else {
        zeroIdx = i;
      }
    }

    sum += this._calcCoords(zeroIdx).row;
    console.log(sum);

    return sum % 2 === 0 ? true : false;
  }

  private _move(item: HTMLElement): void {
    const items: any = document.querySelector('.puzzle')?.children;
    const empty = puzzleDOM.cellsArr.filter(el => el.id === '0')[0];

    const indexes = {
      itemIdx: 0,
      emptyIdx: 0
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

    for (let i = 0; i < items.length; i++) {
      if (item.id === items[i].id) {
        indexes.itemIdx = i + 1;
      } else if (items[i].id === '0') {
        indexes.emptyIdx = i + 1;
      }
    }

    const swap = (item: HTMLElement, empty: HTMLElement) => {
      const itemParent = item.parentNode;
      const emptyParent = empty.parentNode;

      const itemHolder = document.createElement('div');
      const emptyHolder = document.createElement('div');

      itemParent?.replaceChild(itemHolder, item);
      emptyParent?.replaceChild(emptyHolder, empty);

      itemParent?.replaceChild(empty, itemHolder);
      emptyParent?.replaceChild(item, emptyHolder);
    }

    coords.itemCoords = this._calcCoords(indexes.itemIdx);
    coords.emptyCoords = this._calcCoords(indexes.emptyIdx);
    console.log(indexes.itemIdx);
    console.log(`${coords.itemCoords.col} ${coords.itemCoords.row}`);

    if (Math.abs(coords.itemCoords.col - coords.emptyCoords.col)
      + Math.abs(coords.itemCoords.row - coords.emptyCoords.row) > 1) {
      return;
    } else {
      swap(item, empty);
    }

    // item.style.gridColumn = coords.emptyCoords.col.toString();
    // item.style.gridRow = coords.emptyCoords.row.toString();

    // empty.style.gridColumn = coords.itemCoords.col.toString();
    // empty.style.gridRow = coords.itemCoords.row.toString();

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
