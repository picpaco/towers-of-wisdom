import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../model/Carta';
import { Resolve } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MazzoService { /*implements Resolve<any> {*/

constructor(private http: HttpClient) { 
  
}
// resolve(route: ActivatedRouteSnapshot) {
//   //return this.apiService.getItems(route.params.date);
//   let username = "stefano89";
//   let password = "stefanorusso";
//   const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
//   return this.http.get<Carta[]>('http://localhost:8080/mazzo',{headers});
// }

public getMazzoCoperto(): Observable<Carta[]>{

  let username = "stefano89";
  let password = "stefanorusso";
  const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
    const observable = this.http.get<Carta[]>('http://localhost:8080/menu-di-gioco',{headers});
    //observer.complete();
    return observable; 
}

}

//import { APIService } from './api.service';


// @Injectable()
// export class APIResolver implements Resolve<any> {
//   //constructor(private apiService: APIService) {}

  
// }