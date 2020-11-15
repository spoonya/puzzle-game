import {
  images
} from './images';

export default class PuzzleDOM {
  private _boardSize: number = 0;
  private _puzzleItem: HTMLElement | null = null;
  public puzzle: HTMLElement = document.createElement('div');
  private _puzzleWrapper: HTMLElement | null = document.querySelector('.puzzle-wrapper');
  public numArr: number[] = [];
  public solvedNumArr: number[] = [];
  public cellsArr: HTMLElement[] = [];
  public img: string | null = null;

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

  public calcCoords(val: number) {
    const puzzleWidth: number = this.puzzle.clientWidth;
    const puzzleItemWidth: number = puzzleWidth / this.boardSize;
    const totalCols: number = Math.floor(puzzleWidth / puzzleItemWidth);

    return {
      col: val % totalCols === 0 ? totalCols : val % totalCols,
      row: Math.ceil(val / totalCols)
    }
  }

  private _chooseRandImg(min: number, max: number): string {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return images[randNum.toString() + '.jpg'];
  }

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

  public createPuzzle(puzzleStyle: boolean, objForLoad ? : any): void {
    this._cleanBoard();

    this.img = null;
    this.cellsArr = [];

    this.puzzle.classList.add('puzzle');

    this._puzzleWrapper?.append(this.puzzle);

    const imgPart = 100 / (this.boardSize - 1);

    if (!objForLoad && puzzleStyle === true) {
      this.img = this._chooseRandImg(1, 150);
    }

    if (objForLoad) {
      this.solvedNumArr = objForLoad.solvedNumArr;
      this.numArr = objForLoad.numArr;
      this.boardSize = objForLoad.boardSizeInt;
      if (objForLoad.img !== null) {
        this.img = objForLoad.img;
        puzzleStyle = true;
      }
    } else {
      do {
        this.numArr = this._createRandArray(this.boardSize);
      } while (!this._isSovlable());
    }

    this.puzzle.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    const arrLength = this.numArr.length;

    for (let i = 0; i < arrLength; i++) {
      this._puzzleItem = document.createElement('div');

      if (this.numArr[i] === 0) {
        this._puzzleItem.classList.add('puzzle__empty');
      } else {
        if (puzzleStyle) {
          this._puzzleItem.style.color = 'transparent';
          this._puzzleItem.style.textShadow = 'none';
          this._puzzleItem.style.background = `url('${this.img}')`;
          this._puzzleItem.style.backgroundSize = `${100 * this.boardSize}%`;
          this._puzzleItem.style.backgroundPosition =
            `${ (this.calcCoords(this.numArr[i]).col - 1) * imgPart }%
             ${ (this.calcCoords(this.numArr[i]).row - 1) * imgPart }%`;
        }
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