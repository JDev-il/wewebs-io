import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({ selector: '[ColorCondition]', standalone: true })
export class ColorConditionDirective {
  constructor() { }

  ngOnInit(): void {
  }

}
