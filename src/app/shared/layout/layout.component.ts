import { Component } from "@angular/core";

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
