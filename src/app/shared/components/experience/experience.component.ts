import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs';
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

  @Input() isWorkFxEnd: boolean = false;

  public pageName: string = PageName.Work;
  public workExperienceData!: WorkModel[];

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
    // this.animationService.isWork$.pipe(takeUntil(this.unsubscribe$)).subscribe(res=>{
    //   this.isWorkFxEnd = res
    // });
    this.cd.detectChanges();
  }

  passDataToDataService(data: any) {
    this.chartsService.setChartsData(data)
  }

  ngAfterContentInit(): void {

  }

}
