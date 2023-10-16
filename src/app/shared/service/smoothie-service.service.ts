import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Smoothie } from '../model/smoothie';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
}



@Injectable({
  providedIn: 'root'
})
export class SmoothieServiceService {

  constructor(private http: HttpClient) { }

  public getAllSmoothies(): Observable<Smoothie> {
    return this.http.get<Smoothie>('http://localhost:8080/api/smoothies', httpOptions);
  }

  public updateSmoothieDetails(body: Smoothie, id: number) {
    this.http.put('http://localhost:8080/api/smoothie/' + id, body).subscribe(
      (data)=>{
        console.log(data);
        },
       error => {
        console.log(error)
      });
  };

  public deleteSmoothieDetails(id: number) {
    let url: string = 'http://localhost:8080/api/smoothie/' + id;
    console.log(`${url}`);
    this.http.delete<number>(url).subscribe(
      (data)=>{
        console.log(data);
        },
       error => {
        console.log(error)
      });
  };
}
