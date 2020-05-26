import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons';
import { PeticionesService } from '../../services/peticiones.service'
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-barman',
  templateUrl: './barman.component.html',
  styleUrls: ['./barman.component.css'],
  providers: [PeticionesService]
})

export class BarmanComponent implements OnInit {
  faUserFriends = faUserFriends;
  faClock = faClock;
  id_usuario: number;
  selected: number;


  usuario: any;
  listaUsuarios: any;
  listaComandas: any;
  comandaActual: any;
  listaTesteo: any;
  listaFiltradaBarra: any;
  listaFiltradaBarraPanel: any;
  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.listaUsuarios = new Usuario(null, null, null, null)
    this.listaComandas = [];
    this.comandaActual = [];
    this.selected = 0;

    this.listaFiltradaBarra = 0;
    this.listaFiltradaBarraPanel = 0;

  }

  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id;
    this.getUsuario();
    this.getUsuarios();
    setInterval(() => { this.getUsuarios(); }, 5000);
  }
  getUsuario() {
    this._peticionesService.getUsuario(this.id_usuario).subscribe(
      result => {
        this.usuario = result;
      },
      error => {
        console.log(<any>error)
      }
    );
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
      },
      () => {

        this.getComandasBarra()
      }
    );
  }

  getComandasBarra() {
    this.listaComandas = [];
    for (let i = 0; i < this.listaUsuarios.length; i++) {
      for (let j = 0; j < this.listaUsuarios[i].mesas.length; j++) {

        if (this.listaUsuarios[i].mesas[j].comandas[0] != null) {
          this.listaComandas.push({
            id_comanda: this.listaUsuarios[i].mesas[j].comandas[0].id_comanda,
            id_mesa: this.listaUsuarios[i].mesas[j].comandas[0].id_mesa,
            completado_barra: this.listaUsuarios[i].mesas[j].comandas[0].completado_barra,
            completado_cocina: this.listaUsuarios[i].mesas[j].comandas[0].completado_cocina,
            pagado: this.listaUsuarios[i].mesas[j].comandas[0].pagado,
            borrado: this.listaUsuarios[i].mesas[j].comandas[0].borrado,
            comandasProductos: this.listaUsuarios[i].mesas[j].comandas[0].comandasProductos,
            numero_mesa: this.listaUsuarios[i].mesas[j].numero_mesa,
            numero_personas: this.listaUsuarios[i].mesas[j].numero_personas,
            nombre_camarero: this.listaUsuarios[i].nombre,
            hora_creacion_comanda: this.listaUsuarios[i].mesas[j].comandas[0].hora_creacion_comanda.substring(0, 5)
          })
        }
      }
    }
    console.log(this.listaComandas)
    this.filtrarComandasBarra()

  }

  filtrarComandaBarraPanel() {
    this.comandaActual = this.listaFiltradaBarra[this.selected];
    console.log(this.comandaActual)
    var self = this;

    return this.comandaActual.comandasProductos.filter(function (c) {
      if (c.producto.barra) {
        return c
      }
    })
  }

  filtrarComandasBarra() {
    this.listaFiltradaBarra = this.listaComandas.filter(function (e) {
      let hayProductosBarra = false;
      e.comandasProductos.forEach(c => {
        if (c.producto.barra) {
          hayProductosBarra = true;
        }
      });
      if (hayProductosBarra && !e.completado_barra) {
        return e
      }
    })

   // console.log(this.listaFiltradaBarra)
  }


  completarComandaBarra(id_comanda) {
    console.log(id_comanda)
    
    this._peticionesService.completarComandaBarra(id_comanda).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getUsuarios()
        this.selected = this.selected-1;
      }
    );

  }

  redirectToHome() {
    this._router.navigate(["/"])
  }

}
