import { Directive, HostListener, Input } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';

@Directive({
  selector: '[Animations]',
  standalone: true,
})
export class AnimationsDirective {
  @Input() pageName!: string;
  constructor(private animationService: AnimationsService) {}

  @HostListener('animationend', ['$event'])
  animationEnd(animation: AnimationEvent) {
    let animTime = Math.round(animation.elapsedTime  * 10) / 10,
      service = this.animationService;
    if (!service.getAnimationState(this.pageName)) {
      service.setAnimationSession(this.pageName);
    }
    if (
      (animTime === 3.2 && !service.isAboutAnimationLoaded) ||
      (animTime === 2.8 && !service.isAboutAnimationLoaded) ||
      (animTime === 2.4 && !service.isAboutAnimationLoaded) ||
      (animTime === 1.6 && !service.isSidbarAnimationLoaded || animTime === 1.8 && !service.isNavigatorsLoaded) ||
      (animTime === 1 && !service.isWorkAnimationLoaded) ||
      (animTime === .6 && !service.isWorkAnimationLoaded)
    ) {
      service.enableDisableAnimation(this.pageName);
    }
  }

  ngOnInit() {
    let service = this.animationService;
    if (service.getAnimationState(this.pageName)) {
      if (this.pageName === 'about') {
        service.isAboutAnimationLoaded = true;
      } else if (this.pageName === 'sidebar') {
        service.isSidbarAnimationLoaded = true;
        service.isNavigatorsLoaded = true;
      } else if (this.pageName === 'work') {
        service.isWorkAnimationLoaded = true;
      } else if (this.pageName === 'portfolio') {
        service.isPortfolioAnimationLoaded = true;
      }
    }
  }
}
