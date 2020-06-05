import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { PeticionesService } from '../../services/peticiones.service'
import { Usuario } from 'src/app/models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css'],
  providers: [PeticionesService]
})
export class JefeComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  id_usuario: number;
  vistaJefe: string;
  selectedTable: number;
  selected: number;
  esBarraCocina: any;

  filterByNombreProductoString: string;
  filterByCategoriaProductoString: string;
  filterByDepartamentoProductoString: string;

  filterByNombreCategoriaString: string;
  filterByCantidadCategoriaNumber: number;

  filterByRangoEmpleadoString: string;
  filterByNombreEmpleadoString: string;
  filterByApellidosEmpleadoString: string;


  listaUsuarios: any;
  listaProductos: any;
  listaCategorias: any;


  producto: any;
  produtctoToEdit: any;
  cat: any;
  categoriaToEdit: any;
  usuario: any;
  usuarioToEdit: any;

  alertMsgInicio: string;
  alertMsgNombre: string;
  alertMsgFin: string;

  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.vistaJefe = 'Productos';
    this.selectedTable = 0;
    this.selected = 0;
    this.listaUsuarios = [];
    this.listaProductos = [];
    this.listaCategorias = [];

    this.producto = {};
    this.produtctoToEdit = {}
    this.cat = {};
    this.categoriaToEdit = {}
    this.usuario = {}
    this.usuarioToEdit = {}

    this.esBarraCocina = {
      barra: false,
      cocina: false
    }
    this.filterByNombreProductoString = "";
    this.filterByCategoriaProductoString = "";
    this.filterByDepartamentoProductoString = "barraAndCocina";

    this.filterByNombreCategoriaString = "";
    this.filterByCantidadCategoriaNumber = null;

    this.filterByRangoEmpleadoString = "todosEmpleados";
    this.filterByNombreEmpleadoString = "";
    this.filterByApellidosEmpleadoString = "";

    this.alertMsgInicio = "";
    this.alertMsgNombre = "";
    this.alertMsgFin = "";
  }



  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id;
    this.getUsuarios();
    this.getProductos();
    this.getCategorias();
    $("#alertJefe").hide()
    $(".c-input-passw")
      .bind("keypress", function (evt) {
        if (evt.which < 48 || evt.which > 57) {
          evt.preventDefault();
        }
      })
  }


  cambiarSeleccion(pos, cad) {
    this.selected = pos;
    this.vistaJefe = cad;
  }

  togglePasswordVisibility(input) {

    var type = $(input).attr("type");

    if (type === 'password') {
      $(input).attr("type", "text");
    } else {
      $(input).attr("type", "password");
    }
  }
  redirectToHome() {
    this._router.navigate(["/"])
  }

  // PRODUCTOS
  getProductos() {
    this._peticionesService.getProductos().subscribe(
      result => {
        this.listaProductos = result;
        console.log(this.listaProductos)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getNombreCategoriasByIdCategoria()
      }
    );
  }
  addProducto(form) {
    this.producto.nombre = this.producto.nombre.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
    this.producto.id_producto = null;
    this.producto.id_categoria = +this.producto.id_categoria
    console.log(this.producto)
    this._peticionesService.addProducto(this.producto).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.producto.barra = null;
        this.producto.cocina = null;
        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "El producto"
        this.alertMsgNombre = this.producto.nombre
        this.alertMsgFin = "se ha creado correctamente."
        form.reset();
        $('#createProductoModal').modal('hide');
        $('#createProductoModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });

      }
    );
  }
  editProducto(form) {
    this.produtctoToEdit.nombre = this.producto.nombre;
    this.produtctoToEdit.id_categoria = this.producto.id_categoria;
    this.produtctoToEdit.precio = this.producto.precio;
    this.produtctoToEdit.barra = this.producto.barra;
    this.produtctoToEdit.cocina = this.producto.cocina;
    this._peticionesService.editProducto(this.producto.id_producto, this.produtctoToEdit).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "El producto"
        this.alertMsgNombre = this.producto.nombre
        this.alertMsgFin = "se ha editado correctamente."
        form.reset();
        $('#editProductoModal').modal('hide');
        $('#editProductoModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }
  deleteProducto() {
    this._peticionesService.deleteProducto(this.producto.id_producto).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "El producto"
        this.alertMsgNombre = this.producto.nombre
        this.alertMsgFin = "se ha borrado correctamente."
        this.producto.nombre = "";
        $('#deleteProductoModal').modal('hide');
        $('#deleteProductoModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }

  setBarraCocina(condicionalBarra, condicionalCocina) {
    this.producto.barra = condicionalBarra;
    this.producto.cocina = condicionalCocina
  }

  getNombreCategoriasByIdCategoria() {
    for (let i = 0; i < this.listaProductos.length; i++) {
      for (let j = 0; j < this.listaCategorias.length; j++) {
        if (this.listaProductos[i].id_categoria == this.listaCategorias[j].id_categoria) {
          this.listaProductos[i].id_categoria = this.listaCategorias[j].nombre
        }
      }
    }
  }

  getIdCategoriaByNombreCategoria() {
    for (let i = 0; i < this.listaCategorias.length; i++) {
      if (this.listaCategorias[i].nombre == this.producto.nombre_categoria) {
        this.producto.id_categoria = this.listaCategorias[i].id_categoria;
        console.log(this.producto)
      }

    }
  }
  //CATEGORÍAS
  getCategorias() {
    this._peticionesService.getCategorias().subscribe(
      result => {
        this.listaCategorias = result;
        console.log(this.listaCategorias)
      },
      error => {
        console.log(<any>error)
      }
    );
  }
  addCategoria(form) {

    this.cat.nombre = this.cat.nombre.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
    this.cat.id_categoria = null;
    console.log(this.cat)

    this._peticionesService.addCategoria(this.cat).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {

        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "La categoría"
        this.alertMsgNombre = this.cat.nombre
        this.alertMsgFin = "se ha creado correctamente."
        form.reset();
        $('#createCategoriaModal').modal('hide');
        $('#createCategoriaModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }
  editCategoria(form) {
    this.cat.nombre = this.cat.nombre.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    this._peticionesService.editCategoria(this.cat.id_categoria, this.cat).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "La categoría"
        this.alertMsgNombre = this.cat.nombre
        this.alertMsgFin = "se ha editado correctamente."
        form.reset();
        $('#editCategoriaModal').modal('hide');
        $('#editCategoriaModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });

      }
    );
  }
  deleteCategoria() {
    this._peticionesService.deleteCategoria(this.cat.id_categoria).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getProductos();
        this.getCategorias();
        this.alertMsgInicio = "El producto"
        this.alertMsgNombre = this.cat.nombre
        this.alertMsgFin = "se ha borrado correctamente."
        this.cat.nombre = "";
        $('#deleteCategoriaModal').modal('hide');
        $('#deleteCategoriaModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }


  //USUARIOS
  getUsuario() {
    this._peticionesService.getUsuario(this.id_usuario).subscribe(
      result => {
        this.usuario = result;
        console.log(this.usuario)
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

      }
    );
  }
  addUsuario(form) {
    this.usuario.nombre = this.usuario.nombre.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
    this.usuario.apellidos = this.usuario.apellidos.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    console.log(this.usuario)
    this._peticionesService.addUsuario(this.usuario).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getUsuarios()
        this.alertMsgInicio = "El empleado"
        this.alertMsgNombre = this.usuario.nombre + " " + this.usuario.apellidos
        this.alertMsgFin = "se ha creado correctamente."
        form.reset();
        $('#createUsuarioModal').modal('hide');
        $('#createUsuarioModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }
  editUsuario(form) {
    this.usuario.nombre = this.usuario.nombre.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
    this.usuario.apellidos = this.usuario.apellidos.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    this.usuarioToEdit.nombre = this.usuario.nombre;
    this.usuarioToEdit.apellidos = this.usuario.apellidos;
    this.usuarioToEdit.rango = this.usuario.rango;
    this.usuarioToEdit.email = this.usuario.email;
    if (this.usuario.cambiarContrasenia) {
      this.usuarioToEdit.contrasenia = this.usuario.contrasenia;
    }
    this._peticionesService.editUsuario(this.usuario.id_usuario, this.usuarioToEdit).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
      },
      () => {
        this.getUsuarios()
        this.alertMsgInicio = "El empleado"
        this.alertMsgNombre = this.usuario.nombre + " " + this.usuario.apellidos
        this.alertMsgFin = "se ha editado correctamente."
        form.reset();
        $('#editUsuarioModal').modal('hide');
        $('#editUsuarioModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }
  deleteUsuario() {
    this._peticionesService.deleteUsuario(this.usuario.id_usuario).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(<any>error)
        this.getUsuarios()
        this.alertMsgInicio = "El empleado"
        this.alertMsgNombre = this.usuario.nombre + " " + this.usuario.apellidos
        this.alertMsgFin = "se ha borrado correctamente."
        this.cat.nombre = "";
        $('#deleteUsuarioModal').modal('hide');
        $('#deleteUsuarioModal').on('hidden.bs.modal', function () {
          $("#alertJefe").show()
          setTimeout(function () { $("#alertJefe").fadeOut() }, 3500);
        });
      }
    );
  }

  //MODALS

  openCreateProductoModal() {
    $("#createProductoModal").one('shown.bs.modal', function (e) {
      $("#inputNombreProducto").focus();
    }).one('hidden.bs.modal', function (e) {
    }).modal('show')
  }

  openEditProductoModal(nombre, categoria, precio, barra, cocina, id_producto) {
    this.producto.id_producto = id_producto;
    this.producto.nombre = nombre;
    this.producto.nombre_categoria = categoria;
    this.producto.precio = precio;
    this.producto.barra = barra;
    this.producto.cocina = cocina;
    $("#editProductoModal").one('shown.bs.modal', function (e) {

      $('#inputNombreProductoEdit').val(nombre.trim()).addClass("c-capitalize").focus()
      $('#inputPrecioProductoEdit').val(+precio)
      $('#inputCategoriaProductoEdit').val(categoria);
      if (barra) {
        $('#inputBarraProductoEdit').prop('checked', true);
      } else if (cocina) {
        $('#inputCocinaProductoEdit').prop('checked', true);
      } else {
        $('#inputBarraProductoEdit').prop('checked', false);
        $('#inputCocinaProductoEdit').prop('checked', false);
      }
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
    this.getIdCategoriaByNombreCategoria()
  }

  openDeleteProductoModal(id_producto, nombre) {
    this.producto.id_producto = id_producto;
    this.producto.nombre = nombre;
    $("#deleteProductoModal").one('shown.bs.modal', function (e) {
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  }


  openCreateCategoriaModal() {
    $("#createCategoriaModal").one('shown.bs.modal', function (e) {
      $("#inputNombreCategoria").focus();
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  }

  openEditCategoriaModal(id_categoria, nombre) {
    this.cat.id_categoria = id_categoria;
    this.cat.nombre = nombre;
    console.log(this.cat)
    $("#editCategoriaModal").one('shown.bs.modal', function (e) {
      $('#inputNombreCategoriaEdit').val(nombre.trim()).addClass("c-capitalize").focus()
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  }

  openDeleteCategoriaModal(id_categoria, nombre) {
    this.cat.id_categoria = id_categoria;
    this.cat.nombre = nombre;
    $("#deleteCategoriaModal").one('shown.bs.modal', function (e) {
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  }

  openCreateUsuarioModal() {
    $("#createUsuarioModal").one('shown.bs.modal', function (e) {
      $("#inputNombreUsuario").focus();
    }).one('hidden.bs.modal', function (e) {
    }).modal('show')
  }

  openEditUsuarioModal(id_usuario, nombre, apellidos, rango, email, ) {
    this.usuario.nombre = nombre;
    this.usuario.apellidos = apellidos;
    this.usuario.rango = rango;
    this.usuario.email = email;
    this.usuario.id_usuario = id_usuario

    $("#editUsuarioModal").one('shown.bs.modal', function (e) {
      $('#inputNombreUsuarioEdit').val(nombre.trim()).addClass("c-capitalize").focus()
      $('#inputApellidosUsuarioEdit').val(apellidos.trim()).addClass("c-capitalize")
      $('#inputRangoUsuarioEdit').val(rango);
      $('#inputEmailUsuarioEdit').val(email.trim())
      $("#inputContraseniaUsuarioEdit").val("");
      $("#inputRepiteContraseniaUsuarioEdit").val("");
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');

  }

  openDeleteUsuarioModal(id_usuario, nombre, apellidos) {
    this.usuario.id_usuario = id_usuario;
    this.usuario.nombre = nombre;
    this.usuario.apellidos = apellidos;
    $("#deleteUsuarioModal").one('shown.bs.modal', function (e) {
    }).one('hidden.bs.modal', function (e) {
    }).modal('show');
  }



  //FILTROS

  filterListaProductos() {
    this.getNombreCategoriasByIdCategoria()
    var self = this;
    return self.listaProductos.filter(function (p) {
      if (p.nombre.toLowerCase().includes(self.filterByNombreProductoString.toLowerCase())
        && p.id_categoria.toLowerCase().includes(self.filterByCategoriaProductoString.toLowerCase())) {
        switch (self.filterByDepartamentoProductoString) {
          case "barraAndCocina":
            return p
          case "barra":
            if (p.barra) {
              return p
            }
            break;
          case "cocina":
            if (p.cocina) {
              return p
            }
            break;
          default:
            return p
            break;
        }
      }
    })
  }

  filterListaCategorias() {
    var self = this;
    return self.listaCategorias.filter(function (c) {
      if (c.nombre.toLowerCase().includes(self.filterByNombreCategoriaString.toLowerCase())
        && c.productos.length >= self.filterByCantidadCategoriaNumber) {
        return c
      }
    })
  }

  filterListaEmpleados() {

    var self = this;
    return self.listaUsuarios.filter(function (e) {
      if (e.nombre.toLowerCase().includes(self.filterByNombreEmpleadoString.toLowerCase())
        && e.apellidos.toLowerCase().includes(self.filterByApellidosEmpleadoString.toLowerCase())) {

        switch (self.filterByRangoEmpleadoString) {
          case "todosEmpleados":
            return e
          case "jefe":
            if (e.rango == 0) {
              return e
            }
            break;
          case "camarero":
            if (e.rango == 1) {
              return e
            }
            break;
          case "barman":
            if (e.rango == 2) {
              return e
            }
            break;
          case "cocinero":
            if (e.rango == 3) {
              return e
            }
            break;
          default:
            return e
            break;
        }
      }
    })
  }

  //VALIDATORS

  isValidEditUsuario(form) {

    if (this.usuario.cambiarContrasenia) {
      if (form.invalid || this.usuario.nombre == null || this.usuario.apellidos == null
        || this.usuario.rango == null || this.usuario.email == null || this.usuario.contrasenia == null
        || this.usuario.repiteContrasenia == null || this.usuario.contrasenia != this.usuario.repiteContrasenia
      ) { return true }
    } else {
      if (form.invalid || this.usuario.nombre == null || this.usuario.apellidos == null
        || this.usuario.rango == null || this.usuario.email == null
      ) { return true }
      return false
    }














  }

}
