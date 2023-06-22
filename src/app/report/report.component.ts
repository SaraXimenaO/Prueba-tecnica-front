import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { recaudo } from '../models/recaudo-model';
import { ReportService } from '../services/report-service';
import { report } from '../models/report-model';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: report[] = [];
  body : any[] = [];
  totales : any[] = [];
  constructor(private reportService: ReportService) { }
  ngOnInit(): void {
    this.reportService.GetReport('2021-08-01').subscribe(
      (response) => {
        this.report = response;
      },
      (error) => {
        console.error('Error al obtener los recaudos:', error);
      }
    );
  }

  getHeaders(){
    let headers: any[] = [];
    headers.push("");
    for (let i = 0; i < this.report.length; i++) {
      headers.push(this.report[i].estacion);
    }
    return headers;
  }

  getBody(){
    let elements: any[] = [];
    elements.push("2021-08-01")
    for (let i = 0; i < this.report.length; i++) {
      elements.push(this.report[i].valorCant +"   " + this.report[i].valorTabulado);
    }
    return elements;
  }

  GetTotal(){
    let elements: any[] = [];
    let totalCant = 0;
    let totalTab = 0;
    elements.push("Total")
    for (let i = 0; i < this.report.length; i++) {
     totalCant  += this.report[i].valorCant;
     totalTab  += this.report[i].valorTabulado;
      elements.push(totalCant +"   " + totalTab);
      totalCant = 0;
      totalTab = 0;
    }
    
    return elements;
  }

  getTotalGeneral(){
    debugger;
    let elements: any[] = [];
    elements.push("Totales")
    let totalCant = 0;
    let totalTab = 0;
    for (let i = 0; i < this.report.length; i++) {
      totalCant  += this.report[i].valorCant;
     totalTab  += this.report[i].valorTabulado;
    
    }

    elements.push(totalCant +"   " + totalTab);

    
    return elements;
  }

  getTable(){

      const data = [
        {
          table: {
            body: [
              this.getHeaders(),
              this.getBody(),
              this.GetTotal()
            ]
           
          }
          
        }
      ]

      this.body.push(data);

  }

  getTableTotal(){
debugger;
    const data = [
      {
        table: {
          widths: [80, 80],
          body: [
            this.getTotalGeneral()
          ]
        }
      }
    ]

    this.totales.push(data);

}



  generarPDF() {
    this.getTable();
    this.getTableTotal();
    var docDefinition = {
      content: [
        this.body,
        {text: ' ', style: 'header'},
        this.totales
      ] 
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
