import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carta } from '../model/Carta';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from "rxjs/operators";
import { empty } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PescaCartaMazzoCopertoService {

constructor(private http: HttpClient) { }


public addCartaMano(): Observable<Carta[]>{
  let username = "stefano89";
  let password = "stefanorusso";
  const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
    const observable = this.http.get<Carta[]>('http://localhost:8080/pescaDalMazzoCoperto',{headers});
    return observable; 
}

}

// @Injectable({
//   providedIn: "root",
// })
// export class PescaCartaMazzoCopertoResolverService implements Resolve<any> {
//   constructor(private pescaCartaMazzoCopertoService: PescaCartaMazzoCopertoService) {}
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.pescaCartaMazzoCopertoService.addCartaMano().pipe(
//       catchError((error) => {
//         return empty();
//       })
//     );
//   }
// }
