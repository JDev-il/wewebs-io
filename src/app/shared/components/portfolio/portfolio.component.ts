import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Company } from 'src/app/core/interfaces/Company.interface';
import { ProjectModel } from 'src/app/core/interfaces/Project.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { FilesService } from '../../../core/services/files.service';

@Component({
  selector: 'Portfolio',
  templateUrl: './Portfolio.component.html',
  styleUrls: [
    '../../styles/component.core.scss',
    './portfolio.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioComponent implements OnInit, OnDestroy {

  @ViewChild('scrollElement') scrollElement!: ElementRef;
  @ViewChild('bottomScroll') bottomScroll!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @Input() currentTabIndex?: number;


  portfolioSubscription!: Subscription;
  mouseEventSubscription!: Subscription;
  pageName: string = 'portfolio';
  projects: ProjectModel[] = [];
  companies: Company['name'][] = [];

  constructor(private apiService: ApiService, private fileService: FilesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.apiService.cacheVerifier(this.pageName);
    this.portfolioSubscription = this.apiService.portfolio$.subscribe(projects => {
      this.projects = projects;
    })
  }

  ngOnDestroy(): void {
    this.portfolioSubscription.unsubscribe()
  }
}
