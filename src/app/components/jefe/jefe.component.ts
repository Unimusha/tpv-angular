import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { PeticionesService } from '../../services/peticiones.service'

@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css'],
  providers: [PeticionesService]
})
export class JefeComponent implements OnInit {
  id_usuario: number;
  usuario: any;
  constructor(
    private _peticionesService: PeticionesService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.id_usuario = this._route.snapshot.params.id;
    this.getUsuario();
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
  redirectToHome() {
    this._router.navigate(["/"])
  }
}
