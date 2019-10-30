import { Component, OnInit, Input } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'firo-sidebar',
  templateUrl: './firo-sidebar.component.html',
  styleUrls: ['./firo-sidebar.component.scss']
})
export class FiroSidebarComponent implements OnInit {

  @Input()
  tag: string;

  constructor(
    private sidebarService: NbSidebarService,
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(false, this.tag);
  }

  expand() {
    this.sidebarService.expand(this.tag);
  }

  collapse() {
    this.sidebarService.collapse(this.tag);
  }

}
