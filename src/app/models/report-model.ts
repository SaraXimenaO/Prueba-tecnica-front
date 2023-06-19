export class report {
    estacion: string;
    fecha: string;
    valorCant: number;
    valorTabulado: number;
  
    constructor(data: any) {
      this.estacion = data.estacion || '';
      this.fecha = data.fecha || '';
      this.valorCant = data.valorCant || 0;
      this.valorTabulado = data.valorTabulado || 0;
    }
  }