import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(key: string, val: any): void {
    localStorage.setItem(key, JSON.stringify(val));
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  deleteByKey(key: string): void {
    localStorage.removeItem(key);
  }
}
