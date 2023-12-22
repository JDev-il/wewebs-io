import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Inject, Injectable, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { ApiService } from 'src/app/core/services/api.service';
import { MatTabGroup } from '@angular/material/tabs';
import { DOCUMENT } from '@angular/common';
import { FilesService } from 'src/app/core/services/files.service';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss', '../../styles/main-layout.core.scss']
})
export class TabsMenuComponent implements OnInit, AfterContentChecked {

  @ViewChild('tabGroup', { static: false }) tab!: MatTabGroup;
  @ViewChild('matTabHeader') matTabHeader!: ElementRef;

  @Output() nextPage = new EventEmitter;
  @Input() changeCurrentTab: number = 0;
  isSideBarFxEnd!: boolean;
  isNavigatorsFxEnd!: boolean;
  tabIndex!: number;
  selectedIndex = this.changeCurrentTab;
  isDownloaded!: boolean;
  text = "changed";

  constructor(@Inject(DOCUMENT) public document: Document, private renderer: Renderer2, private animationService: AnimationsService, private apiService: ApiService,
    private fileService: FilesService
  ) { }

  ngOnInit() {}

  nextPageEmmiter(index: number) {
    return this.nextPage.emit(index);
  }

  changeTab(tab: any) {
    if (tab.index === undefined) {
      this.changeCurrentTab = 0;
    }
    tab.index === 1 ? this.renderer.addClass(this.tab._elementRef.nativeElement.children[0], 'animateTabsHeader')
      : this.renderer.removeClass(this.tab._elementRef.nativeElement.children[0], 'animateTabsHeader')
    this.changeCurrentTab = tab.index;
    this.nextPageEmmiter(this.changeCurrentTab)
  }

  setTabChange(index: string) {
    this.changeCurrentTab = +index; // back to number
  }

  nextPreviousTab(type: string){
    if(type === 'prev' && this.changeCurrentTab > 0){
      this.changeCurrentTab--
    }
    if(type === 'next' && this.changeCurrentTab < 3) {
      this.changeCurrentTab++
    }
  }

  downloadFile() {
    this.fileService.downloadFile();
    this.isDownloaded = true;
  }

  ngAfterContentChecked(): void {
    if (this.animationService.isSidbarAnimationLoaded) {
      this.isSideBarFxEnd = this.animationService.isSidbarAnimationLoaded;
      this.isNavigatorsFxEnd = this.animationService.isNavigatorsLoaded;
    }
  }
}
