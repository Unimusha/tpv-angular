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
  mesaCuenta: any;
  listaMesas: any;
  comanda: any;
  comandaCuenta: any;
  crearComanda: any;

  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.usuario = new Usuario(null, null, null, null);
    this.mesa = new Mesa(null, null, null, null);
    this.mesaCuenta = new Mesa(null, null, null, null);
    this.comanda =[]
    this.comandaCuenta=[];
    this.crearComanda = new Comanda(null, null, null, null, null);
    this.listaMesas = [];
  }

  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id_usuario;
    this.getUsuario();
     setInterval(() => { this.getUsuario(); }, 5000);

    this.usuario.sort(this.compare)
  }

  asignarValor(i) {
    this.mesa = this.listaMesas[i];
    this.comanda = this.mesa.comandas[0];
    console.log(i)
  }
  asignarValorCuenta(i) {
    this.mesaCuenta = this.listaMesas[i];
    this.comandaCuenta = this.mesaCuenta.comandas[0];
    console.log(i)
  }


  getUsuario() {
    this._peticionesService.getUsuario(this.id_usuario).subscribe(
      result => {
        this.usuario = result;
        this.listaMesas = this.usuario.mesas;
        this.listaMesas.sort(this.compare)
     
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
      },
      () => {
        this.getUsuario()
        $('#createMesaModal').modal('hide');
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
      },
      () => {
        this.getUsuario()
        $('#editMesaModal').modal('hide');
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
        $('#deleteMesaModal').modal('hide');
      }
    );
  }

  goTpv(i){
    this._router.navigate(["/camarero/tpv/" + this.id_usuario + "/" + this.usuario.mesas[i].id_mesa])
  }


  deleteComanda() {
    this._peticionesService.deleteComanda(this.comandaCuenta.id_comanda).subscribe(
      result => {
        console.log(result)
      },
      error => {
 
        console.log(<any>error)
        this.getUsuario();
      },
      () => {
        this.getUsuario()

      }
    );
  }

  redirectToHome() {
    this._router.navigate(["/"])
  }
  compare(a, b) {
    const bandA = a.numero_mesa;
    const bandB = b.numero_mesa;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }




  openCreateMesaModal() {
    $("#createMesaModal").one('shown.bs.modal', function (e) {
      $('#inputNumeroMesaCreate').val("").focus()
      $('#inputNumeroPersonasCreate').val("")
    }).one('hidden.bs.modal', function (e) {
    }).modal('show')
  }

  openEditMesaModal() {


    $("#editMesaModal").one('shown.bs.modal', function (e) {
      $('#inputNumeroMesaEdit').focus()
    
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');

  }

  openDeleteMesaModal() {
    $("#deleteMesaModal").one('shown.bs.modal', function (e) {
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  } 


  openCuentaModal() {
    $("#cuentaModal").one('shown.bs.modal', function (e) {


    }).one('hidden.bs.modal', function (e) {
    }).modal('show')
  }

  getTotal() {
    var total = 0;
    if (this.comandaCuenta.comandasProductos!=null){
    for (let i = 0; i < this.comandaCuenta.comandasProductos.length; i++) {
      total += (this.comandaCuenta.comandasProductos[i].producto.precio * this.comandaCuenta.comandasProductos[i].unidades_producto);

    }
    }
    return total
  }
  
}
