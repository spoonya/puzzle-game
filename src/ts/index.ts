import '../styles/style.scss';
import '../assets/move.mp3';
import PuzzleLogic from './puzzle-logic';
import Header from './header';
import Menu from './menu';

export const menu = new Menu();
export const puzzleLogic  = new PuzzleLogic();

const puzzleInit = (size: number): void => {
  puzzleLogic.newGame(size);
  menu.createMenuAll();
  new Header().createHeader();
};

puzzleInit(4);