import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HtmlParser } from '@angular/compiler';


@Injectable()

export class PeticionesService {
    public url: string;
    public listaUsuarios: any;
    public listaProductos: any;
    constructor(
        public _http: HttpClient
    ) {
        this.url = "http://localhost:8080/"
    }

    ngOnInit(): void {
    }

    getUsuarios(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(this.url + 'api/usuarios', {headers: headers})
    }
    getUsuario(idUsuario): Observable<any> {
        return this._http.get(this.url + 'api/usuarios/' + idUsuario)
    }

    addUsuario(usuario): Observable<any> {
        let json = JSON.stringify(usuario);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.post(this.url + "api/usuarios", json, { headers: headers })
    }
    getMesa(idMesa): Observable<any> {
        return this._http.get(this.url + 'api/mesas/' + idMesa)
    }
    addMesa(mesa) {
        let json = JSON.stringify(mesa);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.post(this.url + "api/mesas", json, { headers: headers })
    }

    editMesa(id, mesa){
         let json = JSON.stringify(mesa);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.patch(this.url + "api/mesas/"+id, json,  { headers: headers })
    }

    deleteMesa(id): Observable<any>{
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.delete(this.url + "api/mesas/"+id,  { headers: headers })
    }
    addComanda(comanda) {
        let json = JSON.stringify(comanda);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.post(this.url + "api/comandas", json, { headers: headers })
    }

    deleteComanda(id): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.delete(this.url + "api/comandas/" + id, { headers: headers })
    }

    getCategorias(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(this.url + 'api/categorias', { headers: headers })
    }

    addComandaProductoList(listaComandaProductos){
        let json = JSON.stringify(listaComandaProductos);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.post(this.url + "api/comandasProductos", json, { headers: headers })
    }
    checkPassword(usuario) {
        let json = JSON.stringify(usuario);
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.post(this.url + "api/usuarios/login", json, { headers: headers })
    }

    completarComandaCocina(id_comanda) {
    
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.patch(this.url + "api/comandas/completadoCocina/" + id_comanda, { headers: headers })
    }
}