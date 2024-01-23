import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { PageName, Tabs } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/component.core.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent extends UnSubscriber implements OnInit, AfterContentInit {

  @Output() changeTab = new EventEmitter();
  @Output() sideBarAnimation = new EventEmitter();
  @Output() navAnimation = new EventEmitter()
  @Input() isAboutTitleFxEnd: boolean = false;
  public isStaticTitleReady: boolean = false;
  @Input() aboutData!: AboutModel;
  public fillHeader: boolean = false;

  constructor(private cd: ChangeDetectorRef) {
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
