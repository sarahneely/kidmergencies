import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { SettingsComponent } from './settings/settings.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HouseholdInfoComponent } from './household-info/household-info.component';
import { SettingsNavComponent } from './settings-nav/settings-nav.component';
import { BootstrapModalModule } from "ng2-bootstrap-modal";

@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent,
    RegisterComponent,
    LoginComponent,
    AddContactsComponent,
    ContactsAdultViewComponent,
    SettingsComponent,
    HomepageComponent,
    HouseholdInfoComponent,
    SettingsNavComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,

    // ROUTING MODULE SHOULD BE LAST
    RoutingModule
  ],
  entryComponents: [
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
