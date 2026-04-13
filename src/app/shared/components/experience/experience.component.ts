import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';
import { PageName } from 'src/app/core/enums/pages.enum';
import { DateField, WorkModel } from 'src/app/core/interfaces/Work.interface';
import { ChartsService } from '../../services/charts.service';

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
export class ExperienceComponent extends UnSubscriber implements AfterContentInit {

  @Input() isWorkFxEnd: boolean = false;
  @Input() workExperienceData!: WorkModel[];

  public pageName: string = PageName.Work;
  public isStep: boolean = false;

  constructor(
    private chartsService: ChartsService,
    private cd: ChangeDetectorRef
  ) {
    super();
    super.ngOnDestroy();
    this.cd.markForCheck();
  }

  public get isExperienceAnimation(): boolean {
    return !!sessionStorage.getItem('experienceAnimation');
  }

  public dateExtractor(dates: DateField): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const normalizedTo = dates.to.toLowerCase().includes("present")
      ? `${year}/${month}`
      : dates.to;

    const [y1, m1] = dates.from.split('/').map(Number);
    const [y2, m2] = normalizedTo.split('/').map(Number);

    return (y2 - y1) * 12 + (m2 - m1) + 1;
  }

  public passDataToDataService(data: any) {
    this.chartsService.setChartsData(data);
  }

  public onAnimationEnd(animation: AnimationEvent) {
    if (animation.animationName === 'translateFadeIn' && !this.isWorkFxEnd) {
      sessionStorage.setItem('experienceAnimation', 'true');
      this.isStep = true;
    }
  }

  ngAfterContentInit(): void {
    if (this.isExperienceAnimation) {
      this.isStep = true;
    }
    this.cd.detectChanges();
  }
}
