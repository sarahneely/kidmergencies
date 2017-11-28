import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';

import { SplashPageComponent } from './splash-page/splash-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent,
    SplashComponent,
    RegisterComponent,
    LoginComponent,
    AddContactsComponent,
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
