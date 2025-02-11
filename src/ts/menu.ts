import { header, puzzleDOM, puzzleLogic } from './index';
import Modal from './modal';

export default class Menu {
  private _puzzleWrapper: HTMLElement | null =
    document.querySelector(".puzzle-wrapper");

  public menuItemArr: any = [];
  public menuMainBtnArr: HTMLElement[] = [];

  public menu: HTMLElement = document.createElement("div");

  private _menuMainBtn: HTMLElement | null = null;

  private _menuItem: HTMLElement | null = null;
  private _menuItemContent: HTMLElement | null = null;
  private _menuItemTitle: HTMLElement | null = null;
  private _menuTable: HTMLElement | null = null;
  private _menuTableRow: HTMLElement | null = null;
  private _menuTableTh: HTMLElement | null = null;
  private _menuTableTd: HTMLElement | null = null;

  private _menuBackBtn: HTMLElement = document.createElement("button");
  private _menuTableBtn: HTMLElement | null = null;

  private _menuItemTxt: HTMLElement | null = null;
  private _menuItemSubtitle: HTMLElement | null = null;

  private _menuItemSelect: any = null;
  private _menuItemOption: HTMLElement | null = null;
  private _menuItemInput: HTMLElement | null = null;
  private _menuItemLabel: HTMLElement | null = null;
  private _menuSubitem: HTMLElement | null = null;

  private _saves: string | null = window.localStorage.getItem("saves");
  private _savesArr: any[] = [];

  private _records: string | null = window.localStorage.getItem("records");
  private _recordsArr: any[] = [];

  private _puzzleStyle = false;

  public audioSettings = {
    soundOfMove: {
      isMute: false,
      path: "assets/move.mp3",
      activate() {
        if (this.isMute) return;
        const audio = new Audio();
        audio.src = this.path;
        audio.volume = 0.2;
        audio.play();
      },
    },
  };

  public menuSetup = {
    class: "menu",
    modif: {
      visible: "menu--visible",
    },
  };

  public menuItemSetup = {
    main: "menu__item",
    modif: {
      visible: "menu__item--visible",
    },
    attrName: "id",
  };

  private _clearTable(id: string): void {
    const table = document.querySelectorAll(id);
    table.forEach((el) => {
      el.remove();
    });
  }

  private _fillRecordsTable(): void {
    this._clearTable("#records-row");

    for (let i = 0; i < this._recordsArr.length; i++) {
      this._menuTableRow = document.createElement("tr");
      this._menuTableRow.setAttribute("id", "records-row");
      document.querySelector(".records-table")?.append(this._menuTableRow);

      this._menuTableTd = document.createElement("td");
      this._menuTableTd.innerText = this._recordsArr[i].puzzleStyle;
      this._menuTableRow.append(this._menuTableTd);

      this._menuTableTd = document.createElement("td");
      this._menuTableTd.innerText = this._recordsArr[i].score;
      this._menuTableRow.append(this._menuTableTd);

      this._menuTableTd = document.createElement("td");
      this._menuTableTd.innerText = this._recordsArr[i].timeTxt;
      this._menuTableRow.append(this._menuTableTd);

      this._menuTableTd = document.createElement("td");
      this._menuTableTd.innerText = this._recordsArr[i].moves;
      this._menuTableRow.append(this._menuTableTd);

      this._menuTableTd = document.createElement("td");
      this._menuTableTd.innerText = this._recordsArr[i].boardSizeTxt;
      this._menuTableRow.append(this._menuTableTd);
    }
  }

  public fillRecordsStorage(curSave?: any): void {
    const style = (): boolean => {
      if (curSave) {
        return curSave.img === null ? false : true;
      } else {
        return this._puzzleStyle === false ? false : true;
      }
    };

    const record = {
      score: "",
      puzzleStyle: style() ? "Img" : "Num",
      boardSizeInt: puzzleDOM.boardSize,
      boardSizeTxt: `${puzzleDOM.boardSize}x${puzzleDOM.boardSize}`,
      timeTxt: header.time,
      timeInt: header.elapsedTime,
      moves: header.movesCount,
    };

    if (!style()) {
      switch (record.boardSizeInt) {
        case 3:
          record.score = Math.ceil(
            100000 / ((record.timeInt / 1000) * 3.2 + record.moves * 3)
          ).toString();
          break;

        case 4:
          record.score = Math.ceil(
            300000 / ((record.timeInt / 1000) * 1.75 + record.moves * 1.7)
          ).toString();
          break;

        case 5:
          record.score = Math.ceil(
            550000 / ((record.timeInt / 1000) * 1.35 + record.moves * 1.5)
          ).toString();
          break;

        case 6:
          record.score = Math.ceil(
            800000 / ((record.timeInt / 1000) * 1.1 + record.moves * 1.25)
          ).toString();
          break;

        case 7:
          record.score = Math.ceil(
            1100000 / ((record.timeInt / 1000) * 0.8 + record.moves * 1.1)
          ).toString();
          break;

        case 8:
          record.score = Math.ceil(
            1400000 / ((record.timeInt / 1000) * 0.5 + record.moves * 1)
          ).toString();
          break;

        default:
          break;
      }
    } else {
      switch (record.boardSizeInt) {
        case 3:
          record.score = Math.ceil(
            300000 / ((record.timeInt / 1000) * 2 + record.moves * 2.7)
          ).toString();
          break;

        case 4:
          record.score = Math.ceil(
            600000 / ((record.timeInt / 1000) * 1.5 + record.moves * 1.6)
          ).toString();
          break;

        case 5:
          record.score = Math.ceil(
            1650000 / ((record.timeInt / 1000) * 1.2 + record.moves * 1.4)
          ).toString();
          break;

        case 6:
          record.score = Math.ceil(
            2400000 / ((record.timeInt / 1000) * 0.85 + record.moves * 1.2)
          ).toString();
          break;

        case 7:
          record.score = Math.ceil(
            3300000 / ((record.timeInt / 1000) * 0.5 + record.moves * 1.1)
          ).toString();
          break;

        case 8:
          record.score = Math.ceil(
            4200000 / ((record.timeInt / 1000) * 0.3 + record.moves * 1)
          ).toString();
          break;

        default:
          break;
      }
    }

    this._recordsArr.push(record);

    this._recordsArr.sort((a, b) => b.score - a.score);

    if (this._recordsArr.length > 10) {
      this._recordsArr.pop();
    }

    window.localStorage.setItem("records", JSON.stringify(this._recordsArr));

    this._records = window.localStorage.getItem("records");

    this._fillRecordsTable();
  }

  public activateResumeBtn(): void {
    this.menuMainBtnArr
      .filter((el) => el.id === "btn-resume")[0]
      .removeAttribute("disabled");
  }

  public deactivateResumeBtn(): void {
    this.menuMainBtnArr
      .filter((el) => el.id === "btn-resume")[0]
      .setAttribute("disabled", "true");
  }

  public activateSaveBtn(): void {
    this.menuMainBtnArr
      .filter((el) => el.id === "btn-save")[0]
      .removeAttribute("disabled");
  }

  public deactivateSaveBtn(): void {
    this.menuMainBtnArr
      .filter((el) => el.id === "btn-save")[0]
      .setAttribute("disabled", "true");
  }

  public showMainMenu(): void {
    this.menu.classList.add(this.menuSetup.modif.visible);
    this.menuItemArr[0].classList.add(this.menuItemSetup.modif.visible);
  }

  public hideMainMenu(): void {
    this.menu.classList.remove(this.menuSetup.modif.visible);
    this.menuItemArr[0].classList.remove(this.menuItemSetup.modif.visible);
    header.resumeFromMenu();
  }

  public createMenu(): void {
    this._puzzleWrapper?.append(this.menu);
    this.menu.classList.add(this.menuSetup.class, this.menuSetup.modif.visible);
    this._menuBackBtn.classList.add("menu__back-btn");
    this._menuBackBtn.setAttribute("id", "btn-back");
    this._menuBackBtn.innerText = "Back";

    const createMenuItemCommon = (
      attrName: string,
      attrVal: string,
      title: string,
      visible?: string
    ): void => {
      this._menuItem = document.createElement("div");
      this._menuItemContent = document.createElement("div");
      this._menuItemTitle = document.createElement("h3");

      visible ? this._menuItem.classList.add(visible) : false;

      this._menuItem.classList.add(this.menuItemSetup.main);
      this._menuItem.setAttribute(attrName, attrVal);
      this._menuItemContent.classList.add("menu__content");
      this._menuItemTitle.classList.add("menu__title");

      this._menuItemTitle.innerText = title;

      this._menuItem.append(this._menuItemTitle);
      this._menuItem.append(this._menuItemContent);
      const cloneBtn = this._menuBackBtn.cloneNode(true);

      cloneBtn.addEventListener("click", (): void => {
        cloneBtn.parentElement?.classList.remove(
          this.menuItemSetup.modif.visible
        );
        this.menuItemArr[0].classList.add(this.menuItemSetup.modif.visible);
      });

      this._menuItem.append(cloneBtn);
      this.menu.append(this._menuItem);
    };

    //Main
    const createMenuMain = (): void => {
      const menuMainSetup = {
        attrVal: "main",
        btnClass: "menu__nav-btn",
        btnAttrName: "id",
        btnSetup: [
          {
            btnAttrVal: "btn-new",
            btnTxt: "New game",
          },
          {
            btnAttrVal: "btn-resume",
            btnTxt: "Continue",
            disabled: "true",
          },
          {
            btnAttrVal: "btn-load",
            btnTxt: "Load game",
          },
          {
            btnAttrVal: "btn-save",
            btnTxt: "Save game",
            disabled: "true",
          },
          {
            btnAttrVal: "btn-scores",
            btnTxt: "Best scores",
          },
          {
            btnAttrVal: "btn-rules",
            btnTxt: "Rules",
          },
          {
            btnAttrVal: "btn-settings",
            btnTxt: "Settings",
          },
        ],
      };

      this._menuItem = document.createElement("div");
      this._menuItem.classList.add(this.menuItemSetup.main);
      this._menuItem.classList.add(this.menuItemSetup.modif.visible);
      this._menuItem.setAttribute(
        this.menuItemSetup.attrName,
        menuMainSetup.attrVal
      );
      this.menu.append(this._menuItem);

      for (let i = 0; i < menuMainSetup.btnSetup.length; i++) {
        this._menuMainBtn = document.createElement("button");

        this._menuMainBtn.classList.add(menuMainSetup.btnClass);
        this._menuMainBtn.setAttribute(
          menuMainSetup.btnAttrName,
          menuMainSetup.btnSetup[i].btnAttrVal
        );
        menuMainSetup.btnSetup[i].disabled
          ? this._menuMainBtn.setAttribute("disabled", "true")
          : false;
        this._menuMainBtn.innerText = menuMainSetup.btnSetup[i].btnTxt;

        this._menuItem.append(this._menuMainBtn);

        this.menuMainBtnArr.push(this._menuMainBtn);
      }

      this.menuItemArr.push(this._menuItem);

      this.menuMainBtnArr.forEach((el) => {
        if (el.id !== "btn-save") {
          el.addEventListener("click", () => {
            this.menuItemArr[0].classList.remove(
              this.menuItemSetup.modif.visible
            );
          });
        }
      });

      //Start new game
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-new")[0]
        .addEventListener("click", () => {
          this.menu.classList.remove(this.menuSetup.modif.visible);
          header.headerBtn.removeAttribute("disabled");
          puzzleLogic.newGame(
            parseInt(this._menuItemSelect?.value),
            this._puzzleStyle
          );
        });

      //Resume game
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-resume")[0]
        .addEventListener("click", () => {
          this.hideMainMenu();
        });

      //Open saves
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-load")[0]
        .addEventListener("click", () => {
          const fillSavesTable = () => {
            this._clearTable("#saves-row");
            for (let i = 0; i < this._savesArr.length; i++) {
              this._menuTableRow = document.createElement("tr");
              this._menuTableRow.setAttribute("id", "saves-row");
              document
                .querySelector(".saves-table")
                ?.append(this._menuTableRow);

              this._menuTableTd = document.createElement("td");
              this._menuTableTd.innerText = this._savesArr[i].boardSizeTxt;
              this._menuTableRow.append(this._menuTableTd);

              this._menuTableTd = document.createElement("td");
              this._menuTableTd.innerText = this._savesArr[i].timeTxt;
              this._menuTableRow.append(this._menuTableTd);

              this._menuTableTd = document.createElement("td");
              this._menuTableTd.innerText = this._savesArr[i].moves;
              this._menuTableRow.append(this._menuTableTd);

              this._menuTableTd = document.createElement("td");
              this._menuTableBtn = document.createElement("button");
              this._menuTableRow.append(this._menuTableTd);
              this._menuTableTd.append(this._menuTableBtn);
              this._menuTableBtn.classList.add("btn-load");
              this._menuTableBtn.setAttribute("id", this._savesArr[i].id);
              this._menuTableBtn.innerText = "Load";

              this._menuTableBtn.addEventListener("click", () => {
                const curSave = this._savesArr.find(
                  (el) => el.id == this._savesArr[i].id
                );
                puzzleLogic.loadGame(curSave);
                this.menu.classList.remove(this.menuSetup.modif.visible);
                this.menuItemArr
                  .filter((el: { id: string }) => el.id === "menu-saved")[0]
                  .classList.remove(this.menuItemSetup.modif.visible);

                header.headerBtn.removeAttribute("disabled");
              });
              this._menuTableRow.append(this._menuTableBtn);

              this._menuTableTd = document.createElement("td");
              this._menuTableBtn = document.createElement("button");
              this._menuTableRow.append(this._menuTableTd);
              this._menuTableTd.append(this._menuTableBtn);
              this._menuTableBtn.classList.add("btn-delete");
              this._menuTableBtn.setAttribute("id", this._savesArr[i].id);
              this._menuTableBtn.innerText = "Delete";

              this._menuTableBtn.addEventListener("click", () => {
                this._savesArr.splice(
                  this._savesArr.indexOf(
                    this._savesArr.find((el) => el.id == this._savesArr[i].id)
                  ),
                  1
                );

                window.localStorage.setItem(
                  "saves",
                  JSON.stringify(this._savesArr)
                );

                this._saves = window.localStorage.getItem("saves");

                new Modal(Modal.alertType.onSaveDelete)
                  .showAlert()
                  .closeAlert(2000);

                fillSavesTable();
              });
              this._menuTableRow.append(this._menuTableBtn);
            }
          };

          fillSavesTable();
          this.menuItemArr[1].classList.add(this.menuItemSetup.modif.visible);
        });

      //Save game
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-save")[0]
        .addEventListener("click", () => {
          const save = {
            id: "",
            img: puzzleDOM.img,
            boardSizeInt: puzzleDOM.boardSize,
            boardSizeTxt: `${puzzleDOM.boardSize}x${puzzleDOM.boardSize}`,
            timeTxt: header.time,
            timeInt: header.elapsedTime,
            moves: header.movesCount,
            solvedNumArr: puzzleDOM.solvedNumArr,
            numArr: puzzleLogic.unsolvedNumArr,
          };

          const generateRandId = () => {
            let randId: string;

            randId =
              Math.floor(Math.random() * (999999 + 1)).toString() +
              Math.random().toString(36).substr(2, 5).toString();

            return randId;
          };

          save.id = generateRandId();

          this._savesArr.push(save);
          window.localStorage.setItem("saves", JSON.stringify(this._savesArr));

          this._saves = window.localStorage.getItem("saves");

          new Modal(Modal.alertType.onGameSave).showAlert().closeAlert(2000);
        });

      //Open scores
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-scores")[0]
        .addEventListener("click", () => {
          this.menuItemArr[2].classList.add(this.menuItemSetup.modif.visible);
        });

      //Open rules
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-rules")[0]
        .addEventListener("click", () => {
          this.menuItemArr[3].classList.add(this.menuItemSetup.modif.visible);
        });

      //Open settings
      this.menuMainBtnArr
        .filter((el) => el.id === "btn-settings")[0]
        .addEventListener("click", () => {
          this.menuItemArr[4].classList.add(this.menuItemSetup.modif.visible);
        });
    };

    //Load
    const createMenuLoad = (): void => {
      if (this._saves !== null) {
        this._savesArr = JSON.parse(this._saves);
      }

      const menuLoadSetup = {
        title: "Load game",
        attrVal: "menu-saved",
        tableClass: "saves-table",
        trAttrName: "id",
        trArrtVal: "save-header-row",
        tableHeader: [
          {
            th: "Size",
          },
          {
            th: "Time",
          },
          {
            th: "Moves",
          },
        ],
      };

      createMenuItemCommon(
        this.menuItemSetup.attrName,
        menuLoadSetup.attrVal,
        menuLoadSetup.title
      );

      this._menuTable = document.createElement("table");
      this._menuTable.classList.add(menuLoadSetup.tableClass);
      this._menuTableRow = document.createElement("tr");
      this._menuTableRow.setAttribute(
        menuLoadSetup.trAttrName,
        menuLoadSetup.trArrtVal
      );

      //Create header
      for (let i = 0; i < menuLoadSetup.tableHeader.length; i++) {
        this._menuTableTh = document.createElement("th");

        this._menuTableTh.innerText = menuLoadSetup.tableHeader[i].th;

        this._menuTableRow.append(this._menuTableTh);
        this._menuTable.append(this._menuTableRow);
      }

      this._menuItemContent?.append(this._menuTable);

      this.menuItemArr.push(this._menuItem);
    };

    //Scores
    const createMenuScores = (): void => {
      if (this._records !== null) {
        this._recordsArr = JSON.parse(this._records);
      }

      const menuScoresSetup = {
        title: "Best scores",
        attrVal: "menu-scores",
        tableClass: "records-table",
        trAttrName: "id",
        trArrtVal: "record-header-row",
        tableHeader: [
          {
            th: "Puzzles",
          },
          {
            th: "Score",
          },
          {
            th: "Time",
          },
          {
            th: "Moves",
          },
          {
            th: "Size",
          },
        ],
      };

      createMenuItemCommon(
        this.menuItemSetup.attrName,
        menuScoresSetup.attrVal,
        menuScoresSetup.title
      );

      this._menuTable = document.createElement("table");
      this._menuTable.classList.add(menuScoresSetup.tableClass);
      this._menuTableRow = document.createElement("tr");
      this._menuTableRow.setAttribute(
        menuScoresSetup.trAttrName,
        menuScoresSetup.trArrtVal
      );

      for (let i = 0; i < menuScoresSetup.tableHeader.length; i++) {
        this._menuTableTh = document.createElement("th");

        this._menuTableTh.innerText = menuScoresSetup.tableHeader[i].th;

        this._menuTableRow.append(this._menuTableTh);
        this._menuTable.append(this._menuTableRow);
      }

      this._menuItemContent?.append(this._menuTable);

      this.menuItemArr.push(this._menuItem);

      this._fillRecordsTable();
    };

    //Rules
    const createMenuRules = (): void => {
      const menuRulesSetup = {
        title: "Rules",
        attrVal: "menu-rules",
        txt: "The object of the puzzle is to place the tiles in order by making sliding moves that use the empty space. You can save your game and load it later. Or you can just use pause button. Also you can choose game field size in Settings.",
      };

      createMenuItemCommon(
        this.menuItemSetup.attrName,
        menuRulesSetup.attrVal,
        menuRulesSetup.title
      );

      this._menuItemTxt = document.createElement("p");
      this._menuItemTxt.innerText = menuRulesSetup.txt;
      this._menuItemContent?.append(this._menuItemTxt);

      this.menuItemArr.push(this._menuItem);
    };

    //Settings
    const createMenuSettings = (): void => {
      const menuSettingsSetup = {
        title: "Settings",
        attrVal: "menu-settings",
        size: {
          title: "Field size: ",
          option: [
            {
              class: "menu__option",
              attrVal: "3",
              txt: "3x3",
            },
            {
              class: "menu__option",
              attrVal: "4",
              txt: "4x4",
              selected: "selected",
            },
            {
              class: "menu__option",
              attrVal: "5",
              txt: "5x5",
            },
            {
              class: "menu__option",
              attrVal: "6",
              txt: "6x6",
            },
            {
              class: "menu__option",
              attrVal: "7",
              txt: "7x7",
            },
            {
              class: "menu__option",
              attrVal: "8",
              txt: "8x8",
            },
          ],
        },
        sound: {
          title: "Sound: ",
          option: [
            {
              label: {
                for: "sound-on",
              },
              input: {
                type: "radio",
                id: "sound-on",
                name: "sound",
                value: false,
                checked: true,
              },
              txt: "On",
            },
            {
              label: {
                for: "sound-off",
              },
              input: {
                type: "radio",
                id: "sound-off",
                name: "sound",
                value: true,
              },
              txt: "Off",
            },
          ],
        },
        puzzleStyle: {
          title: "Puzzles: ",
          option: [
            {
              label: {
                for: "style-num",
              },
              input: {
                type: "radio",
                id: "style-num",
                name: "puzzle-style",
                value: false,
              },
              txt: "Numbers",
            },
            {
              label: {
                for: "style-img",
              },
              input: {
                type: "radio",
                id: "style-img",
                name: "puzzle-style",
                value: true,
                checked: true,
              },
              txt: "Image",
            },
          ],
        },
      };

      const createSubItemCommon = (title: string): void => {
        this._menuSubitem = document.createElement("div");
        this._menuItemSubtitle = document.createElement("h4");

        this._menuSubitem.classList.add("menu__subitem");
        this._menuItemSubtitle?.classList.add("menu__subtitle");

        this._menuItemContent?.append(this._menuSubitem);
        this._menuSubitem.append(this._menuItemSubtitle);

        this._menuItemSubtitle.innerText = title;
      };

      const setAttributes = (el: HTMLElement, attrs: any): void => {
        for (const key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
      };

      createMenuItemCommon(
        this.menuItemSetup.attrName,
        menuSettingsSetup.attrVal,
        menuSettingsSetup.title
      );

      //Init size option
      for (let i = 0; i < menuSettingsSetup.size.option.length; i++) {
        if (i === 0) {
          createSubItemCommon(menuSettingsSetup.size.title);
          this._menuItemSelect = document.createElement("select");
          this._menuSubitem?.append(this._menuItemSelect);
        }

        this._menuItemOption = document.createElement("option");
        this._menuItemOption.classList.add(
          menuSettingsSetup.size.option[i].class
        );
        setAttributes(this._menuItemOption, menuSettingsSetup.size.option[i]);
        this._menuItemOption.innerText = menuSettingsSetup.size.option[i].txt;

        this._menuItemSelect?.append(this._menuItemOption);
      }

      //Init sound option
      for (let i = 0; i < menuSettingsSetup.sound.option.length; i++) {
        if (i === 0) {
          createSubItemCommon(menuSettingsSetup.sound.title);
        }

        this._menuItemInput = document.createElement("input");
        this._menuItemLabel = document.createElement("label");
        setAttributes(
          this._menuItemInput,
          menuSettingsSetup.sound.option[i].input
        );
        setAttributes(
          this._menuItemLabel,
          menuSettingsSetup.sound.option[i].label
        );

        if (menuSettingsSetup.sound.option[i].input.checked) {
          this.audioSettings.soundOfMove.isMute =
            menuSettingsSetup.sound.option[i].input.value;
        }

        this._menuItemLabel.innerText = menuSettingsSetup.sound.option[i].txt;

        this._menuSubitem?.append(this._menuItemInput);
        this._menuSubitem?.append(this._menuItemLabel);
      }

      //Turn on/off sound
      document.getElementsByName("sound").forEach((el) => {
        el.addEventListener("click", () => {
          if (el.id === "sound-on") {
            this.audioSettings.soundOfMove.isMute = false;
          } else {
            this.audioSettings.soundOfMove.isMute = true;
          }
        });
      });

      //Init puzzle style option
      for (let i = 0; i < menuSettingsSetup.puzzleStyle.option.length; i++) {
        if (i === 0) {
          createSubItemCommon(menuSettingsSetup.puzzleStyle.title);
        }

        this._menuItemInput = document.createElement("input");
        this._menuItemLabel = document.createElement("label");
        setAttributes(
          this._menuItemInput,
          menuSettingsSetup.puzzleStyle.option[i].input
        );
        setAttributes(
          this._menuItemLabel,
          menuSettingsSetup.puzzleStyle.option[i].label
        );

        if (menuSettingsSetup.puzzleStyle.option[i].input.checked) {
          this._puzzleStyle =
            menuSettingsSetup.puzzleStyle.option[i].input.value;
        }

        this._menuItemLabel.innerText =
          menuSettingsSetup.puzzleStyle.option[i].txt;

        this._menuSubitem?.append(this._menuItemInput);
        this._menuSubitem?.append(this._menuItemLabel);
      }

      //Puzzle style changing
      document.getElementsByName("puzzle-style").forEach((el) => {
        el.addEventListener("click", () => {
          if (el.id === "style-num") {
            this._puzzleStyle = false;
          } else {
            this._puzzleStyle = true;
          }
        });
      });

      this.menuItemArr.push(this._menuItem);
    };

    createMenuMain();
    createMenuLoad();
    createMenuScores();
    createMenuRules();
    createMenuSettings();
  }
}
