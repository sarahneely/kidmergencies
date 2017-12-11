import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { LoginComponent } from './login/login.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';
import { HouseholdInfoComponent } from './household-info/household-info.component';
import { SettingsComponent } from './settings/settings.component';
import { HomepageComponent } from './homepage/homepage.component';


const appRoutes: Routes = [
    { path: '', component: SplashPageComponent },
    { path: 'home', component: HomepageComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contacts-view', component: ContactsAdultViewComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'add-contacts', component: AddContactsComponent },
    { path: 'register' , component: RegisterComponent },
    

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule { }
