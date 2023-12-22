import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BarController, Chart, ChartConfiguration, ChartOptions, Color } from 'chart.js';
import { map, mergeMap, Subscription } from 'rxjs';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { PieChart } from '../../../interfaces/Chart.interface';
import { WorkModel } from '../../../interfaces/Work.interface';

@Component({
  selector: 'PieChart',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {

  pieData!: PieChart;
  pie: PieChart[] = [];
  currentPieCompany!: string;
  pies: WorkModel[] = [];
  chartSubscription!: Subscription;
  chartOptions: any;

  constructor(private chartService: ChartsService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chartSubscription = this.chartService.pies$.subscribe((pies: any[]) => {
      if (pies.length) {
        this.pies = []
        this.currentPieCompany = pies[0]
        this.pieData =
        {
          labels: ['Frontend', 'Backend'],
          datasets: [
            {
              data: [pies[1].frontend, pies[1].backend],
              backgroundColor: ["#914566" ,"#545479"],
              hoverBackgroundColor: ["#762C4E", "#303254"]
            }
          ]
        }
      } else {
        this.pieData =
        {
          labels: [],
          datasets: [
            {
              data: [50, 50],
              backgroundColor: ["#1F212B", "#2B212B"],
              hoverBackgroundColor: ["#3032542B", "#762C4E2B"]
            }
          ]
        }
      }
      this.cd.markForCheck()
      this.updateChartOptions()
    })
  }

  updateChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          title: {
            display: true,
          },
          onClick: false,
          display: true,
          labels: {
            color: '#FFFADE'
          }
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.chartSubscription.unsubscribe()
  }
}
