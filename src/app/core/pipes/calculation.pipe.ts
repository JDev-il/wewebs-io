import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'M2Y'
})

export class MonthsToYears implements PipeTransform {
  transform(value: number): string {
    let inYears = +(value / 12).toFixed(1)
    if (value < 12) {
      return `${value}mo`
    } else if (value === 12) {
      return `${inYears}yr`
    }
    return `${inYears}yrs`;
  }
}
