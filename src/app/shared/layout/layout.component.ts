import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  constructor(){}

  next!: number;

  pageNumber(num: number) {
    this.next = num;
  }

}
