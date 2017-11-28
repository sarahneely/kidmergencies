import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RoutingModule } from './app.routes';
import { SplashPageComponent } from './splash-page/splash-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent
  ],
  imports: [
    BrowserModule,

    //ROUTING MODULE SHOULD BE LAST
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
