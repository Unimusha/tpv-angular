export class ComandaProducto {

    constructor(
        public id_comanda_producto: number,
        public id_comanda: number,
        public id_producto: number,
        public unidades_producto: number
    ) { }
}