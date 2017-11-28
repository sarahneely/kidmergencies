import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactsAdultViewComponent } from './contacts-adult-view/contacts-adult-view.component';

const appRoutes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-contacts', component: AddContactsComponent },
    { path: 'contacts-adult-view', component: ContactsAdultViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule { }
