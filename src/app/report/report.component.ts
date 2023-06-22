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
    debugger;
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
      elements.push(this.report[i].valorCant +" " + this.report[i].valorTabulado);
    }
    return elements;
  }
  getTable(){

      const data = [
        {
          table: {
            body: [
              this.getHeaders(),
              this.getBody()
            ]
          }
        }
      ]

      this.body.push(data);

  }



  generarPDF() {
    this.getTable();
    var docDefinition = {
      content: this.body
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
