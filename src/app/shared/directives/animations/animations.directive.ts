import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';

@Directive({
  selector: '[Animations]',
  standalone: true
})
export class AnimationsDirective implements OnInit {
  @Input() pageName!: string;

  constructor(private animationService: AnimationsService) { }

  @HostListener('animationend', ['$event'])
  animationEnd(animation: AnimationEvent) {
    let
      animTime = Math.round(animation.elapsedTime * 10) / 10,
      service = this.animationService;
    if (!service.getAnimationSession(this.pageName)) {
      service.setAnimationSession(this.pageName);
    }
    if (
      (animTime === 2.8 && !this.animationService.aboutAnimValue) ||
      ((animTime === 1.6 || animTime === 1.8) && (!this.animationService.sideBarAnimValue || !this.animationService.navAnimValue)) ||
      ((animTime === 1 || animTime === .6) && !this.animationService.workAnimValue)
    ) {
      this.animationService.enableDisableAnimation(this.pageName);
    }
  }

  ngOnInit() {
    if (this.animationService.getAnimationSession(this.pageName)) {
      this.animationService.enableDisableAnimation(this.pageName);
    }
  }
}
