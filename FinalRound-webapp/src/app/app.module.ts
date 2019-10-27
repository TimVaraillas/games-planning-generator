import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http'

// Nebular modules
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbActionsModule, NbMenuModule, NbIconModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Pages
import { HomeComponent } from './_pages/home/home.component';
import { TournamentsListComponent } from './_pages/tournaments-list/tournaments-list.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TournamentsListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
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
