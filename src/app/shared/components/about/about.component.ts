import { AfterContentChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, map, takeUntil } from 'rxjs';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { PageName, Tabs } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/component.core.scss'],
})
export class AboutComponent extends UnSubscriber implements OnInit, AfterContentChecked, OnDestroy {

  @Output() changeTab = new EventEmitter();
  @Output() sideBarAnimation = new EventEmitter();
  @Output() navAnimation = new EventEmitter()
  @Input() isAboutTitleFxEnd: boolean = false;
  private pageName: string = PageName.About
  public isStaticTitleReady: boolean = false;
  public fillHeader: boolean = false;
  public aboutData!: AboutModel;

  testme: any;

  constructor(private animationService: AnimationsService, private apiService: ApiService) {
    super();
  }

  ngOnInit() {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.about$.pipe(takeUntil(this.unsubscribe$)).subscribe(about => {
      this.aboutData = about;
    });

    // this.animationService.isAbout$.pipe(takeUntil(this.unsubscribe$)).subscribe(isAbout => {
    //    this.isAboutTitleFxEnd = isAbout;
    // });
    // this.animationService.isSideBar$.pipe(takeUntil(this.unsubscribe$)).subscribe(isSideBar=>{
    //   this.sideBarAnimation.emit(isSideBar);
    // })
    // this.animationService.isNav$.pipe(takeUntil(this.unsubscribe$)).subscribe(isNav=>{
    //   this.navAnimation.emit(isNav);
    // })

  }

  public viewPortfolio() {
    this.changeTab.emit(Tabs.Portfolio);
  }

  ngAfterContentChecked(): void {
    // if (this.animationService.isAboutAnimationLoaded) {
    //   this.isAboutTitleFxEnd = this.animationService.isAboutAnimationLoaded;
    // }
    if (sessionStorage.getItem(PageName.About)) {
      this.isStaticTitleReady = true
    }
  }
}
