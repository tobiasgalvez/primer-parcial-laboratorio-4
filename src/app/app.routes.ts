import { Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { AltaComponent } from './componentes/alta/alta.component';
import { ChoferesComponent } from './componentes/choferes/choferes.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [


    { path: '', redirectTo: '/bienvenido', pathMatch: "full" },
    { path: 'bienvenido', component: BienvenidoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'alta', component: AltaComponent, canActivate: [AuthGuard]},
    {path: 'choferes', component: ChoferesComponent, canActivate: [AuthGuard]}





];
