import {menu} from './index';

export default class Header {
  private _puzzleWrapper: HTMLElement | null = document.querySelector('.puzzle-wrapper');
  private _header: HTMLElement = document.createElement('header');
  private _stats: HTMLElement = document.createElement('div');
  private _statsTimeWrapper: HTMLElement = document.createElement('time');
  private _statsTime: HTMLElement = document.createElement('span');
  private _statsMovesWrapper: HTMLElement = document.createElement('div');
  private _statsMoves: HTMLElement = document.createElement('span');
  private _headerBtn: HTMLElement = document.createElement('button');
  private _timeText = document.createTextNode('Time: ');
  private _moveText = document.createTextNode('Moves: ');

  public createHeader(): void {
    this._header.classList.add('header');
    this._stats.classList.add('stats');

    this._statsMovesWrapper.classList.add('stats__item');
    this._statsTimeWrapper.classList.add('stats__item');
    this._headerBtn.classList.add('header__btn');

    this._statsMoves.setAttribute('data-header', 'moves');
    this._statsTime.setAttribute('data-header', 'time');
    this._headerBtn.setAttribute('data-header', 'pause-resume');

    this._statsTimeWrapper.append(this._statsTime);
    this._stats.append(this._statsTimeWrapper);

    this._statsMovesWrapper.append(this._statsMoves);
    this._stats.append(this._statsMovesWrapper);

    this._header.append(this._stats);
    this._header.append(this._headerBtn);

    this._puzzleWrapper?.prepend(this._header);

    this._statsTimeWrapper.prepend(this._timeText);
    this._statsTime.innerText = '00:00';
    this._statsMovesWrapper.prepend(this._moveText);
    this._statsMoves.innerText = '0';
    this._headerBtn.innerText = 'Menu';

    this._headerBtn.addEventListener('click', () => menu.menu.classList.add('menu--visible'));
  }

}