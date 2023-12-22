import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'M2Y'
})

export class MonthsToYears implements PipeTransform {
  inYears!: number;
  transform(value: number): string {
    if(value < 12){
      return `${value}mo`
    }
    this.inYears = +(value/12).toFixed(1);
    return `${this.inYears}yrs`;
  }
}
