import { Injectable } from '@angular/core';
import { WorkModel } from 'src/app/core/interfaces/Work.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { BarChart, PieChart } from 'src/app/core/interfaces/Chart.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private currentChartData!: WorkModel
  private piesSource: BehaviorSubject<PieChart[]> = new BehaviorSubject(<PieChart[]>[])
  private barsSource: BehaviorSubject<BarChart[]> = new BehaviorSubject(<BarChart[]>[])

  public readonly bars$ = this.barsSource.asObservable();
  public readonly pies$ = this.piesSource.asObservable();

  constructor(private apiService: ApiService) { }

  public async setChartsData(chartData: WorkModel) {
    if (this.currentChartData?.company === chartData.company) {
      return;
    } else {
      this.currentChartData = chartData;
      const
      getData = await this.apiService.getChartsData(chartData),
      work = getData?.['work_percentage'],
      stacks = getData?.['stacks'];

      this.barsSource.next([stacks, this.currentChartData.company]);
      this.piesSource.next([this.currentChartData.company, work]);
    }
  }

}
