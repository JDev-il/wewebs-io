import { Injectable } from '@angular/core';
import { PageName } from 'src/app/core/enums/pages.enum';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  isNavigatorsLoaded: boolean = false;
  isSidebarAnimationLoaded: boolean = false;
  isAboutAnimationLoaded: boolean = false;
  isWorkAnimationLoaded: boolean = false;
  isPortfolioAnimationLoaded: boolean = false;

  setAnimationSession(pageName: string) {
    sessionStorage.setItem(pageName, 'enabled');
  }

  getAnimationState(pageName: string): boolean {
    return sessionStorage.getItem(pageName) === 'enabled'
  }

  enableDisableAnimation(pageName: string): void {
    switch(pageName){
      case PageName.Sidebar:
        this.isSidebarAnimationLoaded = true;
        this.isNavigatorsLoaded = true;
        return;
      case PageName.About:
        this.isAboutAnimationLoaded = true;
        return;
      case PageName.Work:
        this.isWorkAnimationLoaded = true;
        return;
      case PageName.Portfolio:
        this.isPortfolioAnimationLoaded = true;
        return;
    }
  }
}
