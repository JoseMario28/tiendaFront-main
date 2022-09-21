import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'//disponible en toda la aplicacion
})
export class AuthGuard implements CanActivate ,CanLoad{
  
constructor(private auth: AuthService ,private router:Router){

 
}
 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if(!this.auth.isAuthenticated()){
this.router.navigate(['/login']);
return false;

}
    return true;
  }

  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentification();
  }
  private checkAuthentification():boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
      
      }
      return true;
    }
}
