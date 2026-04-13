import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'M2Y'
})

export class MonthsToYears implements PipeTransform {
  transform(value: number): string {
    if (value < 12) {
      return `// ${value}mo`;
    }
    const years = value / 12;
    const formatted = Number.isInteger(years) ? years : years.toFixed(1);
    return `// ${formatted}yrs`;
  }
}

