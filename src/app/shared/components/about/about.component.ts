import { AfterContentChecked, Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Subscription, takeUntil } from 'rxjs';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { PageName } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/component.core.scss'],
})
export class AboutComponent extends UnSubscriber implements OnInit, AfterContentChecked, OnDestroy {

  @Output() changeTab = new EventEmitter;

  pageName: string = PageName.About
  fillHeader: boolean = false;
  isStaticTitleReady: boolean = false;
  isAboutTitleFxEnd!: boolean;

  aboutData!: AboutModel;

  constructor(private animationService: AnimationsService, private apiService: ApiService, public renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.about$.pipe(takeUntil(this.unsubscribe$)).subscribe(about => {
      this.aboutData = about;
    });
  }

  viewPortfolio() {
    this.changeTab.emit("1");
  }

  ngAfterContentChecked(): void {
    if (this.animationService.isAboutAnimationLoaded) {
      this.isAboutTitleFxEnd = this.animationService.isAboutAnimationLoaded;
    }
    if (sessionStorage.getItem('about')) {
      this.isStaticTitleReady = true
    }
  }
}
