import { header, puzzleDOM } from "./index";

export default class Modal {
  private puzzleWrapper = document.querySelector(".puzzle-wrapper");
  private _modalBg: HTMLElement = document.createElement("div");
  private _modal: HTMLElement = document.createElement("div");
  private _modalInner: HTMLElement = document.createElement("div");
  private _modalTitle: HTMLElement = document.createElement("h3");
  private _modalMsg: HTMLElement = document.createElement("p");

  public static alertType = {
    onGameEnd: {
      title: "Grats!",
      getStats(): string {
        return `You won the game in ${header.movesCount} moves! You've spent ${header.time} and you solved ${puzzleDOM.boardSize}x${puzzleDOM.boardSize} puzzle!`;
      },
    },
    onGameSave: {
      title: "Game successfully saved!",
    },
    onSaveDelete: {
      title: "Save successfully deleted!",
    },
  };

  constructor(type: object) {
    switch (type) {
      case Modal.alertType.onGameEnd:
        this._modalInner.append(this._modalMsg);
        this._modalTitle.innerText = Modal.alertType.onGameEnd.title;
        this._modalMsg.innerText = Modal.alertType.onGameEnd.getStats();
        break;

      case Modal.alertType.onGameSave:
        this._modalTitle.innerText = Modal.alertType.onGameSave.title;
        break;

      case Modal.alertType.onSaveDelete:
        this._modalTitle.innerText = Modal.alertType.onSaveDelete.title;
        break;

      default:
        new Error("Wrong alert type");
        break;
    }
  }

  public showAlert(delay = 0): Modal {
    setTimeout(() => {
      this._modalBg.classList.add("modal-bg");
      this._modal.classList.add("modal");
      this._modalInner.classList.add("modal__inner");
      this._modalTitle.classList.add("modal__title");
      this._modalMsg.classList.add("modal__msg");

      this.puzzleWrapper?.append(this._modalBg);
      this._modalBg.append(this._modal);
      this._modal.append(this._modalInner);
      this._modalInner.prepend(this._modalTitle);
    }, delay);
    return this;
  }

  public closeAlert(delay: number): void {
    setTimeout(() => {
      this._modalBg.remove();
    }, delay);
  }
}
