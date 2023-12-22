import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccordionModule} from 'primeng/accordion'
import {ButtonModule} from 'primeng/button'
import {FieldsetModule} from 'primeng/fieldset';
import {AutoFocusModule} from 'primeng/autofocus';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AccordionModule,
    FieldsetModule,
    AutoFocusModule,
    ChartModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    AccordionModule,
    FieldsetModule,
    AutoFocusModule,
    ChartModule
  ]
})
export class PrimeModule { }
