import { Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { AltaComponent } from './componentes/alta/alta.component';
import { ChoferesComponent } from './componentes/choferes/choferes.component';
import { AuthGuard } from './guards/auth.guard';
import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { TerminosCondicionesComponent } from './componentes/terminos-condiciones/terminos-condiciones.component';
import { TerminosGuard } from './guards/terminos-guard.guard';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [


    { path: '', redirectTo: '/bienvenido', pathMatch: "full" },
    { path: 'bienvenido', component: BienvenidoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'alta', component: AltaComponent, canActivate: [AuthGuard]},
    {path: 'choferes', component: ChoferesComponent, canActivate: [AuthGuard]},
    {path: 'vehiculos', component: VehiculosComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent, canDeactivate: [TerminosGuard] },






];
