import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { PeticionesService } from '../../services/peticiones.service'
import { faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons';

import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
  ,
  providers: [PeticionesService]
})
export class CocineroComponent implements OnInit {
  faUserFriends = faUserFriends;
  faClock = faClock;
  id_usuario: number;
  index_comanda: number;


  usuario: any;
  listaUsuarios: any;
  listaComandas: any;
  comandaActual: any;
  listaTesteo: any;
  listaFiltradaCocina: any;
  listaFiltradaCocinaPanel: any;

  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.listaUsuarios = new Usuario(null, null, null, null)
    this.listaComandas = [];
    this.comandaActual = [];
    this.index_comanda = 0;
    this.listaTesteo = [];
    this.listaFiltradaCocina = 0;
    this.listaFiltradaCocinaPanel = 0;

  }

  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id;
    this.getUsuario();
    this.getUsuarios();
  //  setInterval(this.getUsuarios, 5000);

    setInterval(() => {
      this.getUsuarios();
    }, 5000);
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
        
        this.getComandasCocina()
      }
    );
  }

  getComandasCocina() {
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
    this.filterComandasCocina()
    this.filtrarComandaCocinaPanel()

    console.log(this.listaComandas)
  }

  filtrarComandaCocinaPanel() {
    this.comandaActual = this.listaFiltradaCocina[this.index_comanda];
    console.log(this.comandaActual)
    var self = this;

    this.listaFiltradaCocinaPanel = self.comandaActual.comandasProductos.filter(function (c) {
      if (c.producto.cocina) {
        return c
      }
    })
  }

  filterComandasCocina() {
    this.listaFiltradaCocina = this.listaComandas.filter(function (e) {
      let hayProductoCocina = false;
      e.comandasProductos.forEach(c => {
        if (c.producto.cocina) {
          hayProductoCocina = true;
        }
      });
      if (hayProductoCocina && !e.completado_cocina) {
        return e
      }
    })

    console.log(this.listaFiltradaCocina)
  }

  completarComandaCocina(id_comanda) {
    console.log(id_comanda)
    this._peticionesService.completarComandaCocina(id_comanda).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getUsuarios()
      }
    );

  }

  redirectToHome() {
    this._router.navigate(["/"])
  }

}
