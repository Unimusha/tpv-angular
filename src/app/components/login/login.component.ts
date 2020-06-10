import { Injectable } from '@angular/core'
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Usuario } from '../../models/usuario.model'
import { PeticionesService } from '../../services/peticiones.service'

@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PeticionesService]
})
export class LoginComponent implements OnInit {
  public listaUsuarios: any;
  public panelNumeros: boolean;
  public password: string;
  public passwordAsterisco: string;
  public usuario: any;



  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.panelNumeros = false;
    this.password = "";
    this.passwordAsterisco = "";
    this.usuario = {};
  }

  ngOnInit(): void {
    this.getUsuarios()
    $("#alertLogin").hide()

  }



  seleccionarUsuario(id_usuario, nombre, rango) {
    this.panelNumeros = !this.panelNumeros
    this.usuario.id_usuario = id_usuario;
    this.usuario.nombre = nombre;
    this.usuario.rango = rango;
  }

  pulsarNumero(num: string) {
    if (this.password.length < 6) {
      this.password += num;
      this.passwordAsterisco += "*"
    }
  }
  borrarNumero() {
    this.password = this.password.substring(0, this.password.length - 1)
    this.passwordAsterisco = this.passwordAsterisco.substring(0, this.passwordAsterisco.length - 1)
  }

  isValidPassword() {
    return this.password.length == 6 ? false : true;
  }

  aceptarLogin(isAuthenticated) {

    if (isAuthenticated) {
      console.log("entro aki" + this.usuario.rango)
      switch (this.usuario.rango) {
        case 0:
          this._router.navigate(["/jefe/" + this.usuario.id_usuario])
          break;
        case 1:
          this._router.navigate(["/camarero/"+this.usuario.id_usuario])
          break;
        case 2:
          this._router.navigate(["/barman/" + this.usuario.id_usuario])
          break;
        case 3:
          this._router.navigate(["/cocinero/" + this.usuario.id_usuario])
          break;

        default:
          this._router.navigate(["/login"])
          break;
      }
    } else {
      this.password = "";
      this.passwordAsterisco = "";
      $("#alertLogin").show()
      setTimeout(function () { $("#alertLogin").fadeOut() }, 3500);

    }
    // this.panelNumeros = !this.panelNumeros
    // this.password = ""
    // this.passwordAsterisco = "";
  }

  cancelarLogin() {
    this.panelNumeros = !this.panelNumeros
    this.password = ""
    this.passwordAsterisco = "";
  }

  getUsuarios() {
    this._peticionesService.getUsuarios().subscribe(
      result => {
        this.listaUsuarios = result;
        //console.log(result)
        console.log(this.listaUsuarios)
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  checkPassword() {
    this.usuario.contrasenia = this.password;
    var isAuthenticated: any = false;

    this._peticionesService.checkPassword(this.usuario).subscribe(
      result => {
        console.log(result)
        isAuthenticated = result;
        this.aceptarLogin(isAuthenticated)
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  consoleLog() {
    console.log(this.usuario)
  }

  redirectToHome() {
    this._router.navigate(["/"])
  }
}
