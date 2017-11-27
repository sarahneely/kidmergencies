import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SplashComponent,
    ContactsComponent,
    ContactsAdultViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // ROUTING MODULE SHOULD BE LAST
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
