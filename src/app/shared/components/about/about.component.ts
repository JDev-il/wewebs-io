import { AfterContentChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ApiService } from 'src/app/core/services/api.service';
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

  constructor(private apiService: ApiService) {
    super();
    super.ngOnDestroy();
  }

  ngOnInit() {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.about$.pipe(takeUntil(this.unsubscribe$)).subscribe(about => {
      this.aboutData = about;
    });
  }

  public viewPortfolio() {
    this.changeTab.emit(Tabs.Portfolio);
  }

  ngAfterContentChecked(): void {
    if (sessionStorage.getItem(PageName.About)) {
      this.isStaticTitleReady = true
    }
  }
}
