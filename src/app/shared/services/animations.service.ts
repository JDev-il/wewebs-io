import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from, of } from 'rxjs';
import { PageName } from 'src/app/core/enums/pages.enum';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {

  private animationStateSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sidebarAnimationSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private aboutAnimationSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private workAnimationSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private navAnimationSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private portfolioAnimationSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isAnimationState$ = this.animationStateSource.asObservable();
  public isAbout$ = this.aboutAnimationSource.asObservable();
  public isSideBar$ = this.sidebarAnimationSource.asObservable();
  public isNav$ = this.sidebarAnimationSource.asObservable();
  public isWork$ = this.workAnimationSource.asObservable();
  public isPortfolio$ = this.portfolioAnimationSource.asObservable();

  get aboutAnimValue(): boolean {
    return this.aboutAnimationSource.getValue();
  }
  get sideBarAnimValue(): boolean {
    return this.sidebarAnimationSource.getValue();
  }
  get navAnimValue(): boolean {
    return this.navAnimationSource.getValue();
  }
  get workAnimValue(): boolean {
    return this.workAnimationSource.getValue();
  }
  get portfolioAnimValue(): boolean {
    return this.portfolioAnimationSource.getValue();
  }

  public getAnimationSession(pageName: string) {
    return sessionStorage.getItem(pageName) === 'enabled';
  }

  public setAnimationSession(pageName: string) {
    sessionStorage.setItem(pageName, 'enabled');
  }

  public enableDisableAnimation(pageName: string): void {
    switch (pageName) {
      case PageName.Sidebar:
        this.navAnimationSource.next(true);
        this.sidebarAnimationSource.next(true);
        break;
      case PageName.About:
        this.aboutAnimationSource.next(true);
        break;
      case PageName.Work:
        this.workAnimationSource.next(true);
        break;
      case PageName.Portfolio:
        this.portfolioAnimationSource.next(true);
        break;
    }
  }
}
