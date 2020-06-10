import { Injectable } from "@angular/core";
import { MazzoService } from "./mazzo.service";
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve,
} from "@angular/router";
import { catchError } from "rxjs/operators";
import { empty } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MazzoResolverService implements Resolve<any> {
  constructor(private mazzoService: MazzoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.mazzoService.getMazzoCoperto().pipe(
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
