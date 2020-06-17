import { Injectable } from "@angular/core";
import { ManoService, MazzoCopertoService } from "./mano.service";
import { RouterStateSnapshot, ActivatedRouteSnapshot,Resolve } from "@angular/router";
import { catchError } from "rxjs/operators";
import { empty } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ManoResolverService implements Resolve<any> {

  constructor(private manoService: ManoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.manoService.getMano().pipe(
      catchError((error) => {
        return empty();
      })
    );
  }

}

