import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { PeticionesService } from '../../services/peticiones.service'

import { Categoria } from '../../models/categoria.model'
import { Producto } from '../../models/producto.model'
import { Usuario } from 'src/app/models/usuario.model';
import { Mesa } from 'src/app/models/mesa.model';
import { Comanda } from 'src/app/models/comanda.model';


@Component({
  selector: 'app-tpv',
  templateUrl: './tpv.component.html',
  styleUrls: ['./tpv.component.css'],
  providers: [PeticionesService]
})

export class TpvComponent implements OnInit {
  id_mesa: number;
  id_usuario: number;
  id_comanda: number;
  numeros: string;
  unidades: number;
  tabla: any;
  linea: any;
  selected: number;
  total: number;
  categoriaActual: number;
  comentario: string;


  usuario: any;
  mesa: any;
  comandaProductoList: any;

  categorias: any;
  comanda: any;


  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.tabla = [];
    this.usuario = new Usuario(null, null, null, null)
    this.comandaProductoList = [];
    this.categorias = new Categoria(null, null)
    this.mesa = new Mesa(null, null, null, null)
    this.comanda = new Comanda(null, null, null, null, null);
    this.categoriaActual = 0;
    this.numeros = "";
    this.unidades = 1;
    this.selected = null;
    this.comentario = "";
  }

  ngOnInit(): void {
    this.id_mesa = this._route.snapshot.params.id_mesa;
    this.id_usuario = this._route.snapshot.params.id_usuario;
    this.getCategorias();
    this.getUsuario();
    this.getMesa();
  }

  pulsarNumero(num: string) {
    if (this.numeros.length < 10) {
      this.numeros = num;
    }
  }

  borrarNumero() {
    this.numeros = this.numeros.substring(0, this.numeros.length - 1)
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

  getMesa() {
    this._peticionesService.getMesa(this.id_mesa).subscribe(
      result => {
        this.mesa = result;
      },
      error => {
        console.log(<any>error)
      }
    );
  }
  getCategorias() {
    this._peticionesService.getCategorias().subscribe(
      result => {
        this.categorias = result;
      },
      error => {
        console.log(<any>error)
      }
    );
  }
  cambiarCategoriaActual(index) {
    this.categoriaActual = index;
  }

  addProductoTabla(id_producto, nombre, precio) {
    if (this.numeros != "") {
      this.unidades = +this.numeros
    }
    this.tabla.push({
      id_producto: id_producto,
      unidades: this.unidades,
      nombre: nombre,
      precio: precio,
      subtotal: this.unidades * precio
    });
    this.unidades = 1;
    this.numeros = "";
  }

  addComanda() {
    let self = this;
    this.comanda.id_mesa = this.id_mesa;

    this._peticionesService.addComanda(this.comanda).subscribe(
      result => {
        this.comanda = result;
      },
      error => {
        console.log(<any>error)
      },
      () => {
        console.log(this.comanda)
        this.addComandaProductoList()
      }
    );

  }

  addComandaProductoList() {

    for (let i = 0; i < this.tabla.length; i++) {
      this.comandaProductoList.push({
        id_comanda: this.comanda.id_comanda,
        id_producto: this.tabla[i].id_producto,
        unidades_producto: this.tabla[i].unidades,
        comentario:this.tabla[i].comentario,
        borrado: 0
      });
      console.log(this.comandaProductoList)
    }
    this._peticionesService.addComandaProductoList(this.comandaProductoList).subscribe(
      result => {
        console.log(result)
        this.redirectToCamarero()
      },
      error => {
        console.log(<any>error)
        this.redirectToCamarero()
      }
    );

  }
  anularProductos() {

    if (this.selected != null) {
      this.tabla.splice(this.selected, 1)
      this.selected = null;
    } else {
      this.tabla.pop();
    }
  }

  getTotal() {
    var total = 0;
    for (let i = 0; i < this.tabla.length; i++) {
      total += this.tabla[i].subtotal;

    }
    return total
  }

  addComentario() {
    this.tabla[this.selected].comentario = this.comentario;
    this.comentario = "";
  }

  getNombreProductoForModal() {
    return this.tabla[this.selected].nombre
  }

  redirectToHome() {
    this._router.navigate(["/"])
  }
  redirectToCamarero() {
    this._router.navigate(["/camarero/" + this.id_usuario])
  }

  consolelog() {
    console.log(this.tabla)
  }
}
