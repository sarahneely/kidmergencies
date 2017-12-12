import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { LoginComponent } from './login/login.component';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';
import { HouseholdInfoComponent } from './household-info/household-info.component';
import { SettingsComponent } from './settings/settings.component';
import { KidViewComponent } from './kid-view/kid-view.component';



const appRoutes: Routes = [
    { path: '', component: SplashPageComponent },
    { path: 'kid-view', component: KidViewComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contacts-view', component: ContactsAdultViewComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'emergency-contacts', component: EmergencyContactsComponent },
    { path: 'household-info', component: HouseholdInfoComponent },
    ];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule { }
