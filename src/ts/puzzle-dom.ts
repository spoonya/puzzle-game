export default class PuzzleDOM {
  private _boardSize: number = 4;
  private _container: HTMLElement = document.createElement('div');
  private _puzzleItem: HTMLElement = document.createElement('div');
  public puzzle: HTMLElement = document.createElement('div');
  public numArr: number[] = [];
  public cellsArr: HTMLElement[] = [];

  public get boardSize() {
    return this._boardSize;
  }

  public set boardSize(val: number) {
    if (val >= 3 && val <= 8) {
      this._boardSize = Math.round(val);
    } else {
      throw new Error('Invalid board size');
    }
  }

  private _createRandArray(arrLength: number): number[] {
    const arr: number[] = [];
    arrLength = Math.pow(arrLength, 2);

    for (let i = 0; i < arrLength; i++) {
      arr[i] = i;
    }

    for (let i = arrLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  public createDOM(): void {
    while (this.puzzle.firstChild) {
      this.puzzle.removeChild(this.puzzle.firstChild);
    }

    this.numArr = this._createRandArray(this.boardSize);
    this._container.classList.add('container');
    this.puzzle.classList.add('puzzle');

    this.puzzle.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    document.body.append(this._container);
    this._container.append(this.puzzle);

    const arrLength = this.numArr.length;

    for (let i = 0; i < arrLength; i++) {
      if (this.numArr[i] === 0) {
        this._puzzleItem.classList.add('puzzle__empty');
      } else {
        this._puzzleItem.classList.add('puzzle__item');
        this._puzzleItem.innerText = (this.numArr[i]).toString();
      }

      this._puzzleItem.setAttribute('id', this.numArr[i].toString());

      this.puzzle.append(this._puzzleItem);

      this.cellsArr.push(this._puzzleItem);

      this._puzzleItem = document.createElement('div');
    }
  }
}