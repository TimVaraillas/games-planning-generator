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
  NbUserModule,
  NbSelectModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// OWL Datetime picker
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime-moment';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment/moment-adapter/moment-date-time-adapter.class';
import { FrenchIntl } from 'src/app/_class/owlDateTimeIntl/intl';

// Modules de routing
import { AppRoutingModule } from './app-routing.module';

// Intercepteurs HTTP
import { JwtInterceptor } from './_helpers/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/interceptors/error.interceptor';

// Module Ng2SmartTable
import { Ng2SmartTableModule } from 'ng2-smart-table';

// Ngx Color
import { ColorCircleModule } from 'ngx-color/circle';

// Components FinalRound
import { FiroSidebarComponent } from './_components/firo-sidebar/firo-sidebar.component';
import { ColorCellComponent } from './_components/ng2-smart-table/color-cell/color-cell.component';

// Layouts
import { AppComponent } from './app.component';
import { BlankLayoutComponent } from './_layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './_layouts/main-layout/main-layout.component';

// Pages
import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';
import { RegisterComponent } from './_pages/authentication/register/register.component';
import { LoginComponent } from './_pages/authentication/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { GameListComponent } from './_pages/game/list/game-list.component';
import { GameShowComponent } from './_pages/game/show/game-show.component';
import { GameFormComponent } from './_pages/game/form/game-form.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    FiroSidebarComponent,
    ColorCellComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    GameListComponent,
    GameShowComponent,
    GameFormComponent,
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
    NbSelectModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbToastrModule.forRoot(),
    NbTooltipModule,
    NbUserModule,
    Ng2SmartTableModule,
    ColorCircleModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [ColorCellComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OwlDateTimeIntl, useClass: FrenchIntl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
