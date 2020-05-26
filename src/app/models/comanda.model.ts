export class Comanda {

    constructor(
        public id_comanda: number,
        public id_mesa: number,
        public completado_barra: boolean,
        public completado_cocina: boolean,
        public pagado: boolean
    ) { }
}