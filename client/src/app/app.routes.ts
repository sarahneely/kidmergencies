import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule { }
