import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { MatTabGroup } from '@angular/material/tabs';
import { FilesService } from 'src/app/core/services/files.service';
import { Navigation } from 'src/app/core/enums/navigation.enum';
import { PageName, Tabs } from 'src/app/core/enums/pages.enum';
import { combineLatest, takeUntil, map, Subscription, of } from 'rxjs';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';
import { ApiService } from 'src/app/core/services/api.service';
import { AboutModel } from 'src/app/core/interfaces/About.interface';
import { ProjectModel } from 'src/app/core/interfaces/Project.interface';
import { WorkModel } from 'src/app/core/interfaces/Work.interface';

@Component({
  selector: 'tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss', '../../styles/main-layout.core.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsMenuComponent extends UnSubscriber {

  @ViewChild('tabGroup', { static: false }) tab!: MatTabGroup;
  @ViewChild('matTabHeader') matTabHeader!: ElementRef;

  @Output() nextPage = new EventEmitter<number>;

  private subscriptions: Subscription = new Subscription()

  public pageName = PageName;
  public tabs = Tabs;

  public aboutData!: AboutModel;
  public portfolioData!: ProjectModel[];
  public workData!: WorkModel[];

  public changeCurrentTab!: number;
  public tabIndex!: number;
  public selectedIndex!: number;
  public isDownloaded!: boolean;
  public about!: boolean;
  public work!: boolean;
  public step!: boolean;
  public portfolio!: boolean;
  public isSideBarFxEnds: boolean = false;
  public isNavigatorsFxEnds: boolean = false;

  constructor(
    private animationService: AnimationsService,
    private fileService: FilesService,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    super();
    super.ngOnDestroy();
    this.cd.markForCheck();
    this.changeCurrentTab = Tabs.About;
    this.selectedIndex = this.changeCurrentTab;

    this.subscriptions.add(combineLatest([
      this.animationService.isAbout$,
      this.animationService.isSideBar$,
      this.animationService.isNav$,
      this.animationService.isWork$,
    ]).pipe(takeUntil(this.unsubscribe$), map(([a, b, c, d]) => ({
      about: a,
      sidebar: b,
      nav: c,
      work: d,
    }))
    ).subscribe(animation => {
      this.about = animation.about;
      this.isNavigatorsFxEnds = animation.nav;
      this.isSideBarFxEnds = animation.sidebar;
      this.work = animation.work;
    }).add(
      combineLatest([this.apiService.about$, this.apiService.portfolio$, this.apiService.work$])
        .pipe(
          takeUntil(this.unsubscribe$),
          map(([a, b, c]) => ({
            about: a,
            portfolio: b,
            work: c
          }))
        )
        .subscribe(stream => {
        this.aboutData = stream.about;
        this.portfolioData = stream.portfolio;
        this.workData = stream.work;
      })
    ))
  }

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  public get isSideBarFxEnd(): boolean {
    return this.isSideBarFxEnds;
  }
  public get isNavigatorsFxEnd(): boolean {
    return this.isNavigatorsFxEnds;
  }

  public changeTab(tab: { index: number }) {
    if (tab.index === undefined) {
      this.changeCurrentTab = Tabs.About;
    }
    this.changeCurrentTab = tab.index;
    this.nextPageEmmiter(this.changeCurrentTab)
  }

  public setTabChange(currentTab: string) {
    this.changeCurrentTab = +currentTab;
  }

  public nextPreviousTab(type: string) {
    if (type === Navigation.prev && this.changeCurrentTab > Tabs.About) {
      this.changeCurrentTab--
    }
    if (type === Navigation.next && this.changeCurrentTab < Tabs.Contact) {
      this.changeCurrentTab++
    }
  }

  public downloadFile() {
    this.fileService.downloadFile();
    this.isDownloaded = true;
  }

  private nextPageEmmiter(index: number) {
    this.nextPage.emit(index);
  }

}
