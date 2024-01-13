import { Directive, HostListener, Input } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { PageName } from 'src/app/core/enums/pages.enum';

@Directive({
  selector: '[Animations]',
  standalone: true,
})
export class AnimationsDirective {
  @Input() pageName!: string;
  constructor(private animationService: AnimationsService) { }

  @HostListener('animationend', ['$event'])
  animationEnd(animation: AnimationEvent) {
    let animTime = Math.round(animation.elapsedTime * 10) / 10,
      service = this.animationService;
    if (!service.getAnimationState(this.pageName)) {
      service.setAnimationSession(this.pageName);
    }
    if (
      (animTime === (3.2 || 2.8 || 2.4) && !service.isAboutAnimationLoaded) ||
      (animTime === (1.6 || 1.8) && (!service.isSidebarAnimationLoaded || !service.isNavigatorsLoaded)) ||
      (animTime === (1 || .6) && !service.isWorkAnimationLoaded)
    ) {
      service.enableDisableAnimation(this.pageName);
    }
  }

  ngOnInit() {
    let service = this.animationService;
    if (service.getAnimationState(this.pageName)) {
      this.animationService.enableDisableAnimation(this.pageName);
    }
  }
}
