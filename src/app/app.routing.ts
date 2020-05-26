// Importar modulos del router de angular

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes

import { LoginComponent } from './components/login/login.component';
import { JefeComponent } from './components/jefe/jefe.component';
import { CamareroComponent } from './components/camarero/camarero.component';
import { BarmanComponent } from './components/barman/barman.component';
import { CocineroComponent } from './components/cocinero/cocinero.component';
import { TpvComponent } from './components/tpv/tpv.component';


// Array de rutas

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'jefe/:id', component: JefeComponent },
    { path: 'camarero/:id_usuario',  component: CamareroComponent },
    { path: 'camarero/tpv/:id_usuario/:id_mesa', component: TpvComponent },
    { path: 'barman/:id', component: BarmanComponent },
    { path: 'cocinero/:id', component: CocineroComponent }
];


 
// { path: '**', component: LoginComponent }
// Exportar el modulo del router

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);