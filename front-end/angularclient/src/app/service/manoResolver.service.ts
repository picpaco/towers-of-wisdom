import { Injectable } from "@angular/core";
import { ManoService } from "./mano.service";
import { RouterStateSnapshot, ActivatedRouteSnapshot,Resolve } from "@angular/router";
import { catchError } from "rxjs/operators";
import { empty } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MazzoResolverService implements Resolve<any> {
  constructor(private manoService: ManoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.manoService.getMano().pipe(
      catchError((error) => {
        return empty();
      })
    );
  }
}

// @Injectable({
//   providedIn: 'root'
//   })
//   export class UserResolverService  {
//     constructor(private fakeApi: FakeApiService) { }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//       return this.fakeApi.getUsers().pipe(
//         catchError((error) => {
//         return empty();
//         });
//       );
//     }
//   }
