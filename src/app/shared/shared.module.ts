import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { PrimeModule } from './modules/prime.module';

import * as exported from './layout/layoutExport';

import { MonthsToYears } from '../core/pipes/calculation.pipe';

import { AnimationsDirective } from './directives/animations/animations.directive';
import { ColorConditionDirective } from './directives/coloring/colorConditions.directive';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';

@NgModule({
  declarations: [
    ...exported.components,
    MonthsToYears,
    DialogContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeModule,
    AnimationsDirective,
    ColorConditionDirective,
  ],
  exports: [
    ...exported.components,
  ]
})
export class SharedModule { }
