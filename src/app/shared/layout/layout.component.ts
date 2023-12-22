import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  @ViewChild('pages') pages!: ElementRef;

  next!: number;
  initialDataSubscriber!: Subscription;

  constructor(@Inject(DOCUMENT) public document: any) {}

  ngOnInit(): void {}

  pageNumber(num: any) {
    return this.next = num
  }

}
