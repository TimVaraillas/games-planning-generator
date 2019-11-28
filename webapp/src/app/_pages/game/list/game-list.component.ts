import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SETTINGS } from 'src/config/smart-table';
import { FiroSidebarComponent } from 'src/app/_components/firo-sidebar/firo-sidebar.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  @ViewChild('addSidebar', { static: false })
  addSidebar: FiroSidebarComponent;

  source: LocalDataSource = new LocalDataSource();
  settings: any = SETTINGS;

  constructor() {
    this.settings.columns = {
      name: { title: 'Match', filter: true, width: '90%' }
    };
  }

  ngOnInit() {}

  toggleAddSidebar() {
    this.addSidebar.toggle();
  }
}
