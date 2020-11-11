export default class PuzzleDOM {
  private _boardSize: number = 0;
  private _puzzleItem: HTMLElement | null = null;
  public puzzle: HTMLElement = document.createElement('div');
  private _puzzleWrapper: HTMLElement | null = document.querySelector('.puzzle-wrapper');
  public numArr: number[] = [];
  public solvedNumArr: number[] = [];
  public cellsArr: HTMLElement[] = [];

  public get boardSize() {
    return this._boardSize;
  }

  public set boardSize(val: number) {
    if (val >= 2 && val <= 8) {
      this._boardSize = Math.round(val);
    } else {
      throw new Error('Invalid board size');
    }
  }

  public calcCoords(idx: number) {
    const puzzleWidth: number = this.puzzle.clientWidth;
    const puzzleItemWidth: number = puzzleWidth / this.boardSize;
    const totalCols: number = Math.floor(puzzleWidth / puzzleItemWidth);

    return {
      col: idx % totalCols === 0 ? totalCols : idx % totalCols,
      row: Math.ceil(idx / totalCols)
    }
  };

  private _createRandArray(arrLength: number, isForInitScreen = false): number[] {
    const arr: number[] = [];
    arrLength = Math.pow(arrLength, 2);

    for (let i = 0; i < arrLength; i++) {
      arr[i] = i;
    }

    this.solvedNumArr = arr.slice();
    this.solvedNumArr.push(this.solvedNumArr.splice(0, 1)[0]);

    if (!isForInitScreen) {
      for (let i = arrLength - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    return arr;
  }

  private _isSovlable(): boolean {
    const puzzleLength: number = this.numArr.length - 1;
    let sum: number = 0;
    let zeroIdx: number = 0;

    for (let i = 0; i < puzzleLength; i++) {
      if (this.numArr[i] !== 0) {
        for (let j = i + 1; j <= puzzleLength; j++) {
          if (this.numArr[i] > this.numArr[j] && this.numArr[j] !== 0) {
            sum++;
          }
        }
      } else {
        zeroIdx = i + 1;
      }
    }

    this.boardSize % 2 === 0 ? sum += this.calcCoords(zeroIdx).row : false;
    return sum % 2 === 0;
  }

  private _cleanBoard(): void {
    while (this.puzzle.firstChild) {
      this.puzzle.removeChild(this.puzzle.firstChild);
    }
  }

  public createPuzzle(): void {
    this._cleanBoard();

    this.cellsArr = [];

    this.puzzle.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    this.puzzle.classList.add('puzzle');

    this._puzzleWrapper?.append(this.puzzle);

    do {
      this.numArr = this._createRandArray(this.boardSize);
    } while (!this._isSovlable());

    const arrLength = this.numArr.length;

    for (let i = 0; i < arrLength; i++) {
      this._puzzleItem = document.createElement('div');

      if (this.numArr[i] === 0) {
        this._puzzleItem.classList.add('puzzle__empty');
      } else {
        this._puzzleItem.classList.add('puzzle__item');
        this._puzzleItem.innerText = (this.numArr[i]).toString();
      }

      this._puzzleItem.setAttribute('id', this.numArr[i].toString());

      this.puzzle.append(this._puzzleItem);

      this.cellsArr.push(this._puzzleItem);
    }
  }

  public createInitScreen(): void {
    this._cleanBoard();

    this._createRandArray(4, true);

    this.puzzle.style.gridTemplateColumns = `repeat(4, 1fr)`;

    this.puzzle.classList.add('puzzle');

    this._puzzleWrapper?.append(this.puzzle);

    for (let i = 0; i < this.solvedNumArr.length; i++) {
      this._puzzleItem = document.createElement('div');

      if (this.solvedNumArr[i] === 0) {
        this._puzzleItem.classList.add('puzzle__empty');
      } else {
        this._puzzleItem.classList.add('puzzle__item');
        this._puzzleItem.innerText = (this.solvedNumArr[i]).toString();
      }

      this.puzzle.append(this._puzzleItem);
    }
  }
}