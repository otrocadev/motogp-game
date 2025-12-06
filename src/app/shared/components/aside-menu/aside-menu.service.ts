import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsideMenuService {
  private _menuOption = signal<string>('grand-prix');

  menuOption = this._menuOption.asReadonly();

  setMenuOption(option: string) {
    this._menuOption.set(option);
  }
}
