import {puzzleLogic} from './index';

export default class Menu {
  private _puzzleWrapper: HTMLElement | null = document.querySelector('.puzzle-wrapper');

  public menuItemArr: any = [];
  public menuMainBtnArr: HTMLElement[] = [];

  public menu: HTMLElement = document.createElement('div');

  private _menuMainBtn: HTMLElement | null = null;

  private _menuItem: HTMLElement | null = null;
  private _menuItemContent: HTMLElement | null = null;
  private _menuItemTitle: HTMLElement | null = null;
  private _menuTable: HTMLElement | null = null;
  private _menuTableRow: HTMLElement | null = null;
  private _menuTableTh: HTMLElement | null = null;
  private _menuTableTd: HTMLElement | null = null;

  private _menuBackBtn: HTMLElement = document.createElement('button');
  private _menuTableBtn: HTMLElement | null = null;

  private _menuItemTxt: HTMLElement | null = null;
  private _menuItemSubtitle: HTMLElement | null = null;

  private _menuItemSelect: HTMLElement | null = null;
  private _menuItemOption: HTMLElement | null = null;
  private _menuItemInput: HTMLElement | null = null;
  private _menuItemLabel: HTMLElement | null = null;
  private _menuSubitem: HTMLElement | null = null;

  public createMenuAll(): void {
    this._puzzleWrapper?.append(this.menu);
    this.menu.classList.add('menu', 'menu--visible');
    this._menuBackBtn.classList.add('menu__back-btn');
    this._menuBackBtn.setAttribute('data-menu-btn', 'btn-back');
    this._menuBackBtn.innerText = 'Back';

    const menuItemSetup = {
      main: 'menu__item',
      modif: {
        visible: 'menu__item--visible'
      },
      attrName: 'data-menu'
    };

    const createMenuItemCommon = (attrName: string, attrVal: string, title: string, modif?:string): void => {

      this._menuItem = document.createElement('div');
      this._menuItemContent = document.createElement('div');
      this._menuItemTitle = document.createElement('h3');

      modif ? this._menuItem.classList.add(modif) : false;

      this._menuItem.classList.add(menuItemSetup.main);
      this._menuItem.setAttribute(attrName, attrVal);
      this._menuItemContent.classList.add('menu__content');
      this._menuItemTitle.classList.add('menu__title');

      this._menuItemTitle.innerText = title;

      this._menuItem.append(this._menuItemTitle);
      this._menuItem.append(this._menuItemContent);
      this._menuItem.append(this._menuBackBtn);
      this.menu.append(this._menuItem);
    }

    const createMenuMain = (): void => {
      const menuMainSetup = {
        attrVal: 'main',
        btnClass: 'menu__nav-btn',
        btnAttrName: 'data-menu-btn',
        btnSetup: [
          { btnAttrVal: 'btn-new', btnTxt: 'New game' },
          { btnAttrVal: 'btn-load', btnTxt: 'Load game' },
          { btnAttrVal: 'btn-save', btnTxt: 'Save game' },
          { btnAttrVal: 'btn-scores', btnTxt: 'Best scores' },
          { btnAttrVal: 'btn-rules', btnTxt: 'Rules' },
          { btnAttrVal: 'btn-settings', btnTxt: 'Settings' },
        ]
      };

      this._menuItem = document.createElement('div');
      this._menuItem.classList.add(menuItemSetup.main);
      this._menuItem.classList.add(menuItemSetup.modif.visible);
      this._menuItem.setAttribute(menuItemSetup.attrName, menuMainSetup.attrVal);
      this.menu.append(this._menuItem);

      for (let i = 0; i < menuMainSetup.btnSetup.length; i++) {
        this._menuMainBtn = document.createElement('button');

        this._menuMainBtn.classList.add(menuMainSetup.btnClass);
        this._menuMainBtn.setAttribute(menuMainSetup.btnAttrName, menuMainSetup.btnSetup[i].btnAttrVal);
        this._menuMainBtn.innerText = menuMainSetup.btnSetup[i].btnTxt;

        this._menuItem.append(this._menuMainBtn);

        this.menuMainBtnArr.push(this._menuMainBtn);
      }

      this.menuItemArr.push(this._menuItem);
      this.menuMainBtnArr[0].addEventListener('click', () => {
        this.menu.classList.remove('menu--visible');
        puzzleLogic.newGame(4);
      });

    }

    const createMenuLoad = (): void => {
      const menuLoadSetup = {
        title: 'Load game',
        attrVal: 'menu-saved',
        tableClass: 'saves-table',
        trAttrName: 'data-saves',
        trArrtVal: 'save-row',
        tableHeader: [
          { th: 'Board size' },
          { th: 'Time' },
          { th: 'Moves' }
        ]
      };

      createMenuItemCommon(menuItemSetup.attrName, menuLoadSetup.attrVal, menuLoadSetup.title);

      this._menuTable = document.createElement('table');
      this._menuTable.classList.add(menuLoadSetup.tableClass);
      this._menuTableRow = document.createElement('tr');
      this._menuTableRow.setAttribute(menuLoadSetup.trAttrName, menuLoadSetup.trArrtVal);

      for (let i = 0; i < menuLoadSetup.tableHeader.length; i++) {
        this._menuTableTh = document.createElement('th');

        this._menuTableTh.innerText = menuLoadSetup.tableHeader[i].th;

        this._menuTableRow.append(this._menuTableTh);
        this._menuTable.append(this._menuTableRow);
      }

      this._menuItemContent?.append(this._menuTable);

      this.menuItemArr.push(this._menuItem);
    };

    const createMenuScores = (): void => {
      const menuScoresSetup = {
        title: 'Best scores',
        attrVal: 'menu-scores',
        tableClass: 'record-table',
        trAttrName: 'data-record',
        trArrtVal: 'record-row',
        tableHeader: [
          { th: 'Date' },
          { th: 'Moves' },
          { th: 'Size' },
          { th: 'Time' },
        ]
      };

      createMenuItemCommon(menuItemSetup.attrName, menuScoresSetup.attrVal, menuScoresSetup.title);

      this._menuTable = document.createElement('table');
      this._menuTable.classList.add(menuScoresSetup.tableClass);
      this._menuTableRow = document.createElement('tr');
      this._menuTableRow.setAttribute(menuScoresSetup.trAttrName, menuScoresSetup.trArrtVal);

      for (let i = 0; i < menuScoresSetup.tableHeader.length; i++) {
        this._menuTableTh = document.createElement('th');

        this._menuTableTh.innerText = menuScoresSetup.tableHeader[i].th;

        this._menuTableRow.append(this._menuTableTh);
        this._menuTable.append(this._menuTableRow);
      }

      this._menuItemContent?.append(this._menuTable);

      this.menuItemArr.push(this._menuItem);
    };

    const createMenuRules = (): void => {
      const menuRulesSetup = {
        title: 'Rules',
        attrVal: 'menu-rules',
        txt: 'The object of the puzzle is to place the tiles in order by making sliding moves that use the empty space. You can save your game and load it later. Or you can just use pause button. Also you can choose game field size in Settings.'
      };

      createMenuItemCommon(menuItemSetup.attrName, menuRulesSetup.attrVal, menuRulesSetup.title);

      this._menuItemTxt = document.createElement('p');
      this._menuItemTxt.innerText = menuRulesSetup.txt;
      this._menuItemContent?.append(this._menuItemTxt);

      this.menuItemArr.push(this._menuItem);
    };

    const createMenuSettings = (): void => {
      const menuSettingsSetup = {
        title: 'Settings',
        attrVal: 'menu-settings',
        size: {
          title: 'Field size: ',
          option: [
            { class: 'menu__option', attrVal: '3', txt: '3x3' },
            { class: 'menu__option', attrVal: '4', txt: '4x4' },
            { class: 'menu__option', attrVal: '5', txt: '5x5' },
            { class: 'menu__option', attrVal: '6', txt: '6x6' },
            { class: 'menu__option', attrVal: '7', txt: '7x7' },
            { class: 'menu__option', attrVal: '8', txt: '8x8' },
          ]
        },
        sound: {
          title: 'Sound: ',
          option: [
            {
              label: { for: 'sound-on' },
              input: { type: 'radio', id: 'sound-on', name: 'sound', value: 'on'},
              txt: 'On'
            },
            {
              label: { for: 'sound-off' },
              input: { type: 'radio', id: 'sound-off', name: 'sound', value: 'off', checked: ''},
              txt: 'Off'
            }
          ]
        }
      };

      const createSubItemCommon = (title: string): void => {
        this._menuSubitem = document.createElement('div');
        this._menuItemSubtitle = document.createElement('h4');

        this._menuSubitem.classList.add('menu__subitem');
        this._menuItemSubtitle?.classList.add('menu__subtitle');

        this._menuItemContent?.append(this._menuSubitem);
        this._menuSubitem.append(this._menuItemSubtitle);

        this._menuItemSubtitle.innerText = title;
      };

      const setAttributes = (el: HTMLElement, attrs: any):void => {
        for (let key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
      };

      createMenuItemCommon(menuItemSetup.attrName, menuSettingsSetup.attrVal, menuSettingsSetup.title);

      for (let i = 0; i < menuSettingsSetup.size.option.length; i++) {
        if (i === 0) {
          createSubItemCommon(menuSettingsSetup.size.title);

          this._menuItemSelect = document.createElement('select');

          this._menuSubitem?.append(this._menuItemSelect);
        }

        this._menuItemOption = document.createElement('option');
        this._menuItemOption.classList.add(menuSettingsSetup.size.option[i].class);
        this._menuItemOption.setAttribute('value', menuSettingsSetup.size.option[i].attrVal);
        this._menuItemOption.innerText = menuSettingsSetup.size.option[i].txt;

        this._menuItemSelect?.append(this._menuItemOption);
      }

      for (let i = 0; i < menuSettingsSetup.sound.option.length; i++) {
        if (i === 0) {
          createSubItemCommon(menuSettingsSetup.sound.title);
        }

        this._menuItemInput = document.createElement('input');
        this._menuItemLabel = document.createElement('label');
        setAttributes(this._menuItemInput, menuSettingsSetup.sound.option[i].input);
        setAttributes(this._menuItemLabel, menuSettingsSetup.sound.option[i].label);

        this._menuItemLabel.innerText = menuSettingsSetup.sound.option[i].txt;

        this._menuSubitem?.append(this._menuItemInput);
        this._menuSubitem?.append(this._menuItemLabel);
      }

      this.menuItemArr.push(this._menuItem);
    };

    this._menuBackBtn.addEventListener('click', () => {
      this._menuBackBtn.parentElement?.classList.remove(menuItemSetup.modif.visible);
      this.menuItemArr[0].classList.add(menuItemSetup.modif.visible);
    });

    createMenuMain();
    createMenuLoad();
    createMenuScores();
    createMenuRules();
    createMenuSettings();
  }
}