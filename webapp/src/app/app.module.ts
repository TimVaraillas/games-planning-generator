// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

// Modules de traduction
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Modules Nebular
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbActionsModule,
  NbMenuModule,
  NbIconModule,
  NbContextMenuModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbToastrModule,
  NbTooltipModule,
  NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Modules de routing
import { AppRoutingModule } from './app-routing.module';

// Intercepteurs HTTP
import { JwtInterceptor } from './_helpers/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/interceptors/error.interceptor';

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
import { RegisterComponent } from './_pages/authentication/register/register.component';
import { LoginComponent } from './_pages/authentication/login/login.component';
import { BlankLayoutComponent } from './_layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './_layouts/main-layout/main-layout.component';
import { GameListComponent } from './_pages/game/list/game-list.component';
import { GameAddComponent } from './_pages/game/add/game-add.component';
import { GameShowComponent } from './_pages/game/show/game-show.component';

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
    RegisterComponent,
    LoginComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    GameListComponent,
    GameAddComponent,
    GameShowComponent
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
    NbUserModule,
    Ng2SmartTableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
