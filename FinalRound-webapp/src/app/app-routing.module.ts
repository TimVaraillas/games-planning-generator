import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';

import { HomeComponent } from './_pages/home/home.component';
import { TournamentsListComponent } from './_pages/tournament/list/tournaments-list.component';
import { TournamentAddComponent } from './_pages/tournament/add/tournament-add.component';
import { TournamentShowComponent } from './_pages/tournament/show/tournament-show.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tournament/list', component: TournamentsListComponent },
  { path: 'tournament/add', component: TournamentAddComponent },
  { path: 'tournament/show/:id', component: TournamentShowComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
