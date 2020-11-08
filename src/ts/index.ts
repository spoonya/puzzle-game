import '../styles/style.scss';
import '../assets/move.mp3';
import PuzzleLogic from './puzzle-logic';

const puzzleInit = (size: number) => {
  new PuzzleLogic(size);
};

puzzleInit(4);