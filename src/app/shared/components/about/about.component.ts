import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { PageName, Tabs } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/component.core.scss'],
})
export class AboutComponent extends UnSubscriber implements OnInit, AfterContentInit {

  @Output() changeTab = new EventEmitter();
  @Output() sideBarAnimation = new EventEmitter();
  @Output() navAnimation = new EventEmitter()
  @Input() isAboutTitleFxEnd: boolean = false;
  public isStaticTitleReady: boolean = false;
  @Input() aboutData!: AboutModel;
  public fillHeader: boolean = false;

  constructor(public apiService: ApiService) {
    super();
    super.ngOnDestroy();
  }

  ngOnInit() {
  }

  public viewPortfolio() {
    this.changeTab.emit(Tabs.Portfolio);
  }

  ngAfterContentInit(): void {
    if (sessionStorage.getItem(PageName.About)) {
      this.isStaticTitleReady = true
    }
  }

}
