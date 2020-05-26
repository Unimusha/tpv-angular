import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CamareroComponent } from './components/camarero/camarero.component';
import { CocineroComponent } from './components/cocinero/cocinero.component';
import { JefeComponent } from './components/jefe/jefe.component';
import { BarmanComponent } from './components/barman/barman.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TpvComponent } from './components/tpv/tpv.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CamareroComponent,
    CocineroComponent,
    JefeComponent,
    BarmanComponent,
    TpvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
