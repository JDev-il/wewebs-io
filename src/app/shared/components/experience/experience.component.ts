import {
  AfterContentChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatExpansionPanel,
  MatExpansionPanelDefaultOptions,
} from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { WorkModel } from 'src/app/core/interfaces/Work.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'Experience',
  templateUrl: './experience.component.html',
  styleUrls: [
    './experience.component.scss',
    '../../styles/animations.core.scss',
    '../../styles/component.core.scss',
  ]
})
export class ExperienceComponent implements OnInit, AfterContentChecked, OnDestroy {

  @Input() currentBarCompany!: string

  pageName: string = "work";

  step = 0;
  isWorkFxEnd: boolean = false;
  panelOpenState: boolean = false;
  isTitleClicked: boolean = false;

  workExperienceSubscribe!: Subscription
  workExperienceData: WorkModel[] = [];

  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement!: MatExpansionPanel;
  chosenPositionValue!: string;

  constructor(
    private animationService: AnimationsService,
    private apiService: ApiService,
    private chartsService: ChartsService
  ) { }

  ngOnInit(): void {
    this.apiService.cacheVerifier(this.pageName);
    this.workExperienceSubscribe = this.apiService.work$.subscribe(work => {
      this.workExperienceData = work;
    })
  }

  passDataToDataService(data: any) {
    this.chartsService.setChartsData(data)
  }

  sendCurrentCompany(name: string){
    this.currentBarCompany = name
  }

  ngAfterContentChecked(): void {
    if (this.animationService.isWorkAnimationLoaded) {
      this.isWorkFxEnd = this.animationService.isWorkAnimationLoaded;
    }
  }

  ngOnDestroy(): void {
    this.workExperienceSubscribe.unsubscribe()
  }
}
