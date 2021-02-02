import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {
  }

  printPlanEndpoint = 'nucleus/api/v1/';

  getPrintPlans(id: string, language: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('subscription-id', id);
    params = params.append('lang', language);
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    httpOptions.params = params;
    return this.http.get(`${environment.apiUrl}` + this.printPlanEndpoint + 'activities/', httpOptions);
  }

  getBomdetails(id: string, language: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('subscription-id', id);
    params = params.append('lang', language);
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    httpOptions.params = params;
    return this.http.get(`${environment.apiUrl}` + this.printPlanEndpoint + 'bom/', httpOptions);
  }
}
