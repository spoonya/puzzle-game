import '../styles/style.scss';
import PuzzleLogic from './puzzle-logic';

const puzzleInit = (size: number) => {
  new PuzzleLogic(size);
};

puzzleInit(3);