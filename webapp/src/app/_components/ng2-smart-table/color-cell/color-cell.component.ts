import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-color-cell',
  templateUrl: './color-cell.component.html',
  styleUrls: ['./color-cell.component.scss']
})
export class ColorCellComponent implements ViewCell, OnInit {

  color: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
    this.color = this.value.toString();
  }

}
