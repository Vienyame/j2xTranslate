import { Injectable } from '@angular/core';
import { PlatformDetectService } from '../platformDetect';

@Injectable()
export class LocalStorageService {
  constructor(private platformDetectService: PlatformDetectService) {}

  setItem(key: string, value: any) {
    if (this.platformDetectService.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (this.platformDetectService.isBrowser) {
      return localStorage.getItem(key);
    }
  }
}
