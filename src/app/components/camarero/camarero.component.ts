import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { faCoins, faUserFriends, faCalendar, faTrash, faUserEdit, faPlus, faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { PeticionesService } from '../../services/peticiones.service'

import { Usuario } from '../../models/usuario.model'
import { Mesa } from '../../models/mesa.model'
import { Comanda } from '../../models/comanda.model'



@Component({
  selector: 'app-camarero',
  templateUrl: './camarero.component.html',
  styleUrls: ['./camarero.component.css'],
  providers: [PeticionesService]
})
export class CamareroComponent implements OnInit {
  faCoins = faCoins;
  faUserFriends = faUserFriends;
  faCalendar = faCalendar;
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faPlus = faPlus;
  faBreadSlice = faBreadSlice;

  id_usuario: number;
  id_mesa: number;
  usuario: any;
  mesa: any;
  comanda: any;
  crearComanda: any;

  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.usuario = new Usuario(null, null, null, null);
    this.mesa = new Mesa(null, null, null, null);
    this.comanda = new Comanda(null, null, null, null, null);
    this.crearComanda = new Comanda(null, null, null, null, null);
  }

  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id_usuario;
    this.getUsuario();
     setInterval(() => { this.getUsuario(); }, 5000);
  }

  asignarValor(i) {
    this.mesa = this.usuario.mesas[i];
    this.comanda = this.mesa.comandas[0];
    console.log(i)
  }


  getUsuario() {
    this._peticionesService.getUsuario(this.id_usuario).subscribe(
      result => {
        this.usuario = result;
        //console.log(result)
        console.log(this.usuario)
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  addMesa() {
    this.mesa.id_usuario = this.id_usuario
    this._peticionesService.addMesa(this.mesa).subscribe(
      result => {
        console.log(result)
        this.getUsuario();
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  editMesa() {
    this._peticionesService.editMesa(this.mesa.id_mesa, this.mesa).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getUsuario();
      }
    );
  }
  deleteMesa() {
    this._peticionesService.deleteMesa(this.mesa.id_mesa).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getUsuario();
      }
    );
  }

  goTpv(i){
    this._router.navigate(["/camarero/tpv/" + this.id_usuario + "/" + this.usuario.mesas[i].id_mesa])
  }

  // addComanda(i) {
   
  //   this.crearComanda.id_mesa = this.usuario.mesas[i].id_mesa;

  //   this._peticionesService.addComanda(this.crearComanda).subscribe(
  //     result => {
  //       console.log(result)
  //       this.getUsuario();
  //     },
  //     error => {
  //       console.log(<any>error)
  //       this.getUsuario();
  //     }
  //   );
  // }
  deleteComanda() {
    this._peticionesService.deleteComanda(this.comanda.id_comanda).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getUsuario();
      }
    );
  }

  redirectToHome() {
    this._router.navigate(["/"])
  }
}
