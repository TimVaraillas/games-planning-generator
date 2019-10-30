import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';
import { HomeComponent } from './_pages/home/home.component';
import { TournamentListComponent } from './_pages/tournament/list/tournament-list.component';
import { TournamentShowComponent } from './_pages/tournament/show/tournament-show.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tournament/list', component: TournamentListComponent },
  { path: 'tournament/show/:id', component: TournamentShowComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
