import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ProjectModel } from 'src/app/core/interfaces/Project.interface';
import { ApiService } from 'src/app/core/services/api.service';
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

  @Input() projects!: ProjectModel[];

  @ViewChild('scrollElement') scrollElement!: ElementRef;

  public pageName: string = PageName.Portfolio;


  constructor(private cd: ChangeDetectorRef) {
    super();
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }
}
