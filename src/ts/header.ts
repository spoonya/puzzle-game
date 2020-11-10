import {menu} from './index';

export default class Header {
  private _puzzleWrapper: HTMLElement | null = document.querySelector('.puzzle-wrapper');
  private _header: HTMLElement = document.createElement('header');
  private _stats: HTMLElement = document.createElement('div');
  private _statsTimeWrapper: HTMLElement = document.createElement('time');
  private _statsTime: HTMLElement = document.createElement('span');
  private _statsMovesWrapper: HTMLElement = document.createElement('div');
  private _statsMoves: HTMLElement = document.createElement('span');
  public headerBtn: HTMLElement = document.createElement('button');
  private _timeText = document.createTextNode('Time: ');
  private _timerInterval: any = 0;
  private _elapsedTime: number  = 0;
  private _startTime: number = 0;
  private _moveText = document.createTextNode('Moves: ');
  private _movesCount: number = 0;

  public createHeader(): void {
    this._header.classList.add('header');
    this._stats.classList.add('stats');

    this._statsMovesWrapper.classList.add('stats__item');
    this._statsTimeWrapper.classList.add('stats__item');
    this.headerBtn.classList.add('header__btn');

    this._statsMoves.setAttribute('id', 'moves');
    this._statsTime.setAttribute('id', 'time');
    this.headerBtn.setAttribute('id', 'pause-resume');
    this.headerBtn.setAttribute('disabled', 'true');

    this._statsTimeWrapper.append(this._statsTime);
    this._stats.append(this._statsTimeWrapper);

    this._statsMovesWrapper.append(this._statsMoves);
    this._stats.append(this._statsMovesWrapper);

    this._header.append(this._stats);
    this._header.append(this.headerBtn);

    this._puzzleWrapper?.prepend(this._header);

    this._statsTimeWrapper.prepend(this._timeText);
    this._statsTime.innerText = '00:00';
    this._statsMovesWrapper.prepend(this._moveText);
    this._statsMoves.innerText = '0';
    this.headerBtn.innerText = 'Menu';

    this.headerBtn.addEventListener('click', () => this._pauseGame());
  }

  private _formatTime(time: any): string {
    const diffInHrs = time / 3600000;
    const hh = Math.floor(diffInHrs);

    const diffInMin = (diffInHrs - hh) * 60;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    const formattedMM = mm.toString().padStart(2, '0');
    const formattedSS = ss.toString().padStart(2, '0');

    return `${formattedMM}:${formattedSS}`;
  }

  public startTime(): void {
    this._startTime = Date.now() - this._elapsedTime;
    this._timerInterval = setInterval(() => {
      this._elapsedTime = Date.now() - this._startTime;
      this._statsTime.innerText = this._formatTime(this._elapsedTime);
    }, 1000);
  }

  private _pauseTime(): void {
    clearInterval(this._timerInterval);
  }

  public resetTime(): void {
    clearInterval(this._timerInterval);
    this._statsTime.innerText = '00:00';
    this._elapsedTime = 0;
  }

  public countMoves() {
    this._statsMoves.innerText = (++this._movesCount).toString();
  }

  public resetMoves() {
    this._movesCount = 0;
    this._statsMoves.innerText = this._movesCount.toString();
  }

  private _pauseGame() {
    this._pauseTime();
    menu.menu.classList.add(menu.menuSetup.visible);
    menu.menuMainBtnArr.filter(el => el.id === 'btn-resume')[0].removeAttribute('disabled');
  }
}