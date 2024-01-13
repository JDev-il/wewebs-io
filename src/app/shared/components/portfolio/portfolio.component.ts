import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Company } from 'src/app/core/interfaces/Company.interface';
import { ProjectModel } from 'src/app/core/interfaces/Project.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { FilesService } from '../../../core/services/files.service';
import { PageName } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'Portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: [
    '../../styles/component.core.scss',
    './portfolio.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioComponent extends UnSubscriber implements OnInit {

  @ViewChild('scrollElement') scrollElement!: ElementRef;
  @ViewChild('bottomScroll') bottomScroll!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @Input() currentTabIndex?: number;

  pageName: string = PageName.Portfolio;
  projects: ProjectModel[] = [];
  companies: Company['name'][] = [];

  constructor(private apiService: ApiService, private fileService: FilesService, private renderer: Renderer2) { super() }

  ngOnInit(): void {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.portfolio$.pipe(takeUntil(this.unsubscribe$)).subscribe(projects => {
      this.projects = projects;
    })
  }
}
