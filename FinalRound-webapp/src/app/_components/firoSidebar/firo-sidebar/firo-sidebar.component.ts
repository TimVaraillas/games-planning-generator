import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'firo-sidebar',
  templateUrl: './firo-sidebar.component.html',
  styleUrls: ['./firo-sidebar.component.scss']
})
export class FiroSidebarComponent implements OnInit {

  constructor(
    private sidebarService: NbSidebarService,
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(false, 'firo-sidebar');
  }

  expand() {
    this.sidebarService.expand('firo-sidebar');
  }

  collapse() {
    this.sidebarService.collapse('firo-sidebar');
  }

}
