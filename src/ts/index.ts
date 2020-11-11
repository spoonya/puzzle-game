import '../styles/style.scss';
import '../assets/move.mp3';
import PuzzleLogic from './puzzle-logic';
import PuzzleDOM from './puzzle-dom';
import Header from './header';
import Menu from './menu';

export const puzzleLogic: PuzzleLogic  = new PuzzleLogic();
export const puzzleDOM: PuzzleDOM  = new PuzzleDOM();
export const header: Header = new Header();
export const menu: Menu = new Menu();

const puzzleInit = (): void => {
  puzzleDOM.createInitScreen();
  header.createHeader();
  menu.createMenu();
};

puzzleInit();