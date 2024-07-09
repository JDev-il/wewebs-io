import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
              backgroundColor: ["#F3B16C", "#326D98"],
              hoverBackgroundColor: ["#E4A272", "#3F6181"],
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
              backgroundColor: ["#E4A27221", "#3F618121"],
              hoverBackgroundColor: ["##E4A2722B", "#3F61812B"]
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
            color: '#ffffff'
          }
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.chartSubscription.unsubscribe()
  }
}
