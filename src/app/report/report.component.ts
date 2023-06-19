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



  generarPDF() {
    var docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
      
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        }
      ]
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
