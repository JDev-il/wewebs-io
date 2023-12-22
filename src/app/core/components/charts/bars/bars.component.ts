import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BarController, Chart, ChartConfiguration, ChartOptions, Color } from 'chart.js';
import { map, mergeMap, Subscription } from 'rxjs';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { BarChart } from '../../../interfaces/Chart.interface';
import { WorkModel } from '../../../interfaces/Work.interface';

@Component({
  selector: 'BarChart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BarChartComponent implements OnInit, AfterViewInit {

  @Output() sendCurrentCompany = new EventEmitter;

  currentBarCompany: string = '';
  isChartExists: boolean = true;

  basicOptions: any;
  chartSubscription!: Subscription;

  labels!: BarChart['labels'];
  dataset!: BarChart['datasets']['0']['data']
  dataSetlabel!: BarChart['datasets']['0']['label'];
  dataSetBgColors!: BarChart['datasets']['0']['backgroundColor'];
  basicData!: BarChart;

  constructor(private chartService: ChartsService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chartSubscription = this.chartService.bars$.subscribe((data: any[]) => {
      if (data[0] !== undefined && data[1] !== undefined) {
        this.currentBarCompany = data[1];
        this.basicData = {
          labels: [...data[0]?.languages],
          datasets: [{
            type: 'bar',
            backgroundColor: [...data[0]?.colors],
            data: [...data[0]?.usage],
          }]
        };
        this.isChartExists = true
        this.cd.markForCheck();
      } else {
        this.isChartExists = false
        this.basicData = {
          labels: [],
          datasets: [{
            type: 'bar',
            label: '',
            backgroundColor: [],
            data: []
          }]
        };
      }
    })
    this.updateChartOptions();
  }

  updateChartOptions() {
    this.basicOptions = {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 0,
            callback: (value: any) => {
              return value+'%';
            }
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.chartSubscription.unsubscribe()
  }
}
