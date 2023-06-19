import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  ngOnInit(): void {
  
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
