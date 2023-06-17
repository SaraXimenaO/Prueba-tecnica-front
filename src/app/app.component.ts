import { Component, OnInit } from '@angular/core';
import { recaudo } from './models/recaudo-model'
import { RecaudoService } from './services/recaudos-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prueba-tecnica-front';
  recaudos: recaudo[] = [];


  constructor(private recaudoService: RecaudoService) {

  }
  ngOnInit(): void {
    this.recaudoService.GetRecaudo('2021-08-01').subscribe(
      (response) => {
        this.recaudos = response;
      },
      (error) => {
        console.error('Error al obtener los recaudos:', error);
      }
    );
  }
}
