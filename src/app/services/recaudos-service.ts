import { map } from "rxjs/operators";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { recaudo } from "../models/recaudo-model";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class RecaudoService {
    constructor(private http: HttpClient) {}

    GetRecaudo(date: string): Observable<recaudo[]> {
        return this.http.get<recaudo[]>(`https://localhost:7097/PruebaTecnica/${date}`);
      }



}