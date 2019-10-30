// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http'

// Modules de traduction
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Modules Nebular
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbActionsModule, NbMenuModule, NbIconModule, NbContextMenuModule, NbCardModule, NbButtonModule, NbInputModule, NbToastrModule, NbTooltipModule, NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Modules de routing
import { AppRoutingModule } from './app-routing.module';

// Module Ng2SmartTable
import { Ng2SmartTableModule } from 'ng2-smart-table';

// Components FinalRound

import { FiroSidebarComponent } from './_components/firo-sidebar/firo-sidebar.component';
// Pages
import { AppComponent } from './app.component';
import { HomeComponent } from './_pages/home/home.component';
import { TournamentListComponent } from './_pages/tournament/list/tournament-list.component';
import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';
import { TournamentAddComponent } from './_pages/tournament/add/tournament-add.component';
import { TournamentShowComponent } from './_pages/tournament/show/tournament-show.component';
import { TournamentUpdateComponent } from './_pages/tournament/update/tournament-update.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FiroSidebarComponent,
    HomeComponent,
    TournamentListComponent,
    PageNotFoundComponent,
    TournamentAddComponent,
    TournamentShowComponent,
    TournamentUpdateComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbToastrModule.forRoot(),
    NbTooltipModule,
    Ng2SmartTableModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
