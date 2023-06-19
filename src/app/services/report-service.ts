import { map } from "rxjs/operators";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { recaudo } from "../models/recaudo-model";
import { Observable } from "rxjs";
import { report } from "../models/report-model";


@Injectable({
    providedIn: "root",
})
export class ReportService {
    constructor(private http: HttpClient) {}

    GetReport(date: string): Observable<report[]> {
        return this.http.get<report[]>(`https://localhost:7097/PruebaTecnica/Report/${date}`);
      }



}