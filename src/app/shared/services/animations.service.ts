import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  isNavigatorsLoaded: boolean = false;
  isSidebarAnimationLoaded: boolean = false;
  isAboutAnimationLoaded: boolean = false;
  isWorkAnimationLoaded: boolean = false;
  isPortfolioAnimationLoaded: boolean = false;
  constructor() {}

  setAnimationSession(pageName: string) {
    if (pageName) {
      sessionStorage.setItem(pageName, 'enabled');
    }
  }
  getAnimationState(pageName: string) {
    if (sessionStorage.getItem(pageName) === 'enabled') {
      return true;
    } else {
      return false;
    }
  }

  enableDisableAnimation(pageName: string) {
    if (pageName === 'sidebar') {
      this.isSidebarAnimationLoaded = true;
      this.isNavigatorsLoaded = true;
    } else if (pageName === 'about') {
      this.isAboutAnimationLoaded = true;
    } else if (pageName === 'work') {
      this.isWorkAnimationLoaded = true;
    } else if (pageName === 'portfolio') {
      this.isPortfolioAnimationLoaded = true;
    }
  }
}