import '../styles/style.scss';
import '../assets/move.mp3';
import PuzzleLogic from './puzzle-logic';
import Header from './header';
import Menu from './menu';

export const menu: Menu = new Menu();
export const puzzleLogic: PuzzleLogic  = new PuzzleLogic();
export const header: Header = new Header();

const puzzleInit = (size: number): void => {
  header.createHeader();
  menu.createMenu();
  // puzzleLogic.newGame(size);
};

puzzleInit(3);