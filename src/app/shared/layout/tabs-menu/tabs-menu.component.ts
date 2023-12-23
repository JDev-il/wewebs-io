import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { MatTabGroup } from '@angular/material/tabs';
import { FilesService } from 'src/app/core/services/files.service';
import { Navigation } from 'src/app/core/enums/navigation.enum';

@Component({
  selector: 'tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss', '../../styles/main-layout.core.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsMenuComponent implements AfterContentInit {

  @ViewChild('tabGroup', { static: false }) tab!: MatTabGroup;
  @ViewChild('matTabHeader') matTabHeader!: ElementRef;

  @Output() nextPage = new EventEmitter<number>;

  public changeCurrentTab!: number;
  public tabIndex!: number;
  public selectedIndex!: number;
  public isDownloaded!: boolean;
  public text = "changed";

  constructor(
    private animationService: AnimationsService,
    private fileService: FilesService,
    private cd: ChangeDetectorRef
  ) {
    this.changeCurrentTab = 0;
    this.selectedIndex = this.changeCurrentTab;
  }


  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  public get isSideBarFxEnd() {
    return this.animationService.isSidebarAnimationLoaded;
  }
  public get isNavigatorsFxEnd() {
    return this.animationService.isNavigatorsLoaded;
  }

  public changeTab(tab: {index: number}) {
    if (tab.index === undefined) {
      this.changeCurrentTab = 0;
    }
    this.changeCurrentTab = tab.index;
    this.nextPageEmmiter(this.changeCurrentTab)
  }

  public setTabChange(currentTab: string) {
    this.changeCurrentTab = +currentTab;
  }

  public nextPreviousTab(type: string) {
    if (type === Navigation.prev && this.changeCurrentTab > 0) {
      this.changeCurrentTab--
    }
    if (type === Navigation.next && this.changeCurrentTab < 3) {
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
