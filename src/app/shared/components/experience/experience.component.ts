import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatExpansionPanel,
} from '@angular/material/expansion';
import { Subscription, takeUntil } from 'rxjs';
import { WorkModel } from 'src/app/core/interfaces/Work.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { ChartsService } from '../../services/charts.service';
import { PageName } from 'src/app/core/enums/pages.enum';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';

@Component({
  selector: 'Experience',
  templateUrl: './experience.component.html',
  styleUrls: [
    './experience.component.scss',
    '../../styles/animations.core.scss',
    '../../styles/component.core.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent extends UnSubscriber implements OnInit, AfterContentInit {

  pageName: string = PageName.Work;
  isWorkFxEnd: boolean = false;
  panelOpenState: boolean = false;
  isTitleClicked: boolean = false;
  workExperienceData!: WorkModel[];

  constructor(
    private animationService: AnimationsService,
    private apiService: ApiService,
    private chartsService: ChartsService,
    private cd: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.work$.pipe(takeUntil(this.unsubscribe$)).subscribe(work => {
      this.workExperienceData = work;
    })
  }

  passDataToDataService(data: any) {
    this.chartsService.setChartsData(data)
  }

  ngAfterContentInit(): void {
    if (this.animationService.isWorkAnimationLoaded) {
      this.isWorkFxEnd = this.animationService.isWorkAnimationLoaded;
    }
    this.cd.detectChanges();
  }

}
