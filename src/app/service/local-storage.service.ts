import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  public clean(): void {
    localStorage.clear();
  }

  public remove(key: string): void {
    localStorage.removeItem(key)
  }
}
