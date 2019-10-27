import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_pages/home/home.component';
import { TournamentsListComponent } from './_pages/tournaments-list/tournaments-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tournament/list', component: TournamentsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
