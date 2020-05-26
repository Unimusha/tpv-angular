export class Producto {

    constructor(
        public id_producto: number,
        public id_categoria: number,
        public nombre: string,
        public precio: number,
        public barra: boolean,
        public cocina: boolean
    ) { }
}