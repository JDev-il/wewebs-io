import { AfterContentChecked, Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/component.core.scss'],
})
export class AboutComponent implements OnInit, AfterContentChecked, OnDestroy {

  @Output() changeTab = new EventEmitter;

  pageName: string = "about"
  fillHeader: boolean = false;
  isStaticTitleReady: boolean = false;
  isAboutTitleFxEnd!: boolean;

  aboutSubscription!: Subscription;
  aboutData!: AboutModel;

  constructor(private animationService: AnimationsService, private apiService: ApiService, public renderer: Renderer2) {
  }

  ngOnInit() {
    this.apiService.cacheVerifier(this.pageName);
    this.aboutSubscription = this.apiService.about$.subscribe(about => {
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

  ngOnDestroy(): void {
    this.aboutSubscription.unsubscribe()
  }

}
