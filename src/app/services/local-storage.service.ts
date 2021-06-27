import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(val: any): void {
    localStorage.setItem('opponentPick', JSON.stringify(val));
  }

  get(): any {
    return JSON.parse(localStorage.getItem('opponentPick') as string);
  }

  deleteAll(): void {
    localStorage.clear();
  }
}
