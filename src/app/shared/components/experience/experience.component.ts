import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { takeUntil } from 'rxjs';
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
  @Input() workExperienceData!: WorkModel[];

  public pageName: string = PageName.Work;
  public isStep: boolean = false;

  constructor(
    private chartsService: ChartsService,
    private cd: ChangeDetectorRef
  ) {
    super()
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this.workExperienceData.length ? this.isStep = true : '';
    this.cd.detectChanges();
  }

  passDataToDataService(data: any) {
    this.chartsService.setChartsData(data)
  }
}
