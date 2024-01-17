import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, take, takeLast, takeUntil, takeWhile } from 'rxjs';
import { WorkModel } from 'src/app/core/interfaces/Work.interface';
import { ApiService } from 'src/app/core/services/api.service';
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
export class ExperienceComponent extends UnSubscriber implements OnInit {

  @Input() isWorkFxEnd: boolean = false;

  public pageName: string = PageName.Work;
  public workExperienceData!: WorkModel[];
  public isStep: boolean = false;

  constructor(
    private apiService: ApiService,
    private chartsService: ChartsService,
    private cd: ChangeDetectorRef
  ) {
    super()
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this.apiService.cacheVerifier(this.pageName);
    this.apiService.work$.pipe(takeUntil(this.unsubscribe$)).subscribe(work => {
      this.isStep = true;
      this.workExperienceData = work;
    })

    this.cd.detectChanges();
  }

  passDataToDataService(data: any) {
    this.chartsService.setChartsData(data)
  }
}
