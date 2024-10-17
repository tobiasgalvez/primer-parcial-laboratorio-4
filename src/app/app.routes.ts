import { Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { AltaComponent } from './componentes/alta/alta.component';

export const routes: Routes = [


    { path: '', redirectTo: '/bienvenido', pathMatch: "full" },
    { path: 'bienvenido', component: BienvenidoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'alta', component: AltaComponent },





];
