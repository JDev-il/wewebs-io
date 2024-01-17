import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { MatTabGroup } from '@angular/material/tabs';
import { FilesService } from 'src/app/core/services/files.service';
import { Navigation } from 'src/app/core/enums/navigation.enum';
import { PageName, Tabs } from 'src/app/core/enums/pages.enum';
import { combineLatest, takeUntil, map, Observable, Subject, Subscription } from 'rxjs';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss', '../../styles/main-layout.core.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsMenuComponent extends UnSubscriber implements AfterContentInit {

  @ViewChild('tabGroup', { static: false }) tab!: MatTabGroup;
  @ViewChild('matTabHeader') matTabHeader!: ElementRef;

  @Output() nextPage = new EventEmitter<number>;


  public pageName = PageName;
  public tabs = Tabs;
  public changeCurrentTab!: number;
  public tabIndex!: number;
  public selectedIndex!: number;
  public isDownloaded!: boolean;

  public about!: boolean;
  public work!: boolean;
  public portfolio!: boolean;

  public isSideBarFxEnds: boolean = false;
  public isNavigatorsFxEnds: boolean = false;

  count: number = 0;

  subscriptions: Subscription = new Subscription()

  constructor(
    private animationService: AnimationsService,
    private fileService: FilesService,
    private cd: ChangeDetectorRef
  ) {
    super();
    super.ngOnDestroy();

    this.changeCurrentTab = Tabs.About;
    this.selectedIndex = this.changeCurrentTab;

    this.subscriptions.add(combineLatest([
      this.animationService.isAbout$,
      this.animationService.isSideBar$,
      this.animationService.isNav$,
      this.animationService.isWork$,
    ]).pipe(takeUntil(this.unsubscribe$),map(([a, b, c, d]) => ({
        about: a,
        sidebar: b,
        nav: c,
        work: d
      }))
    ).subscribe(subs=>{
        this.about = subs.about;
        this.isNavigatorsFxEnds = subs.nav;
        this.isSideBarFxEnds = subs.sidebar;
        this.work = subs.work;
    }));
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

  public changeTab(tab: {index: number}) {
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
