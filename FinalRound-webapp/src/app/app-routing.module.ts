import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './_layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './_layouts/blank-layout/blank-layout.component';

import { HomeComponent } from './_pages/home/home.component';
import { TournamentListComponent } from './_pages/tournament/list/tournament-list.component';
import { TournamentShowComponent } from './_pages/tournament/show/tournament-show.component';
import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';
import { LoginComponent } from './_pages/authentication/login/login.component';
import { RegisterComponent } from './_pages/authentication/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tournament/list', component: TournamentListComponent },
      { path: 'tournament/show/:id', component: TournamentShowComponent },
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'tournament/list', component: TournamentListComponent },
  // { path: 'tournament/show/:id', component: TournamentShowComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
