import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.authService.isLoggedIn;
      const authorization = this.authService.getAuthorization();

      if ( currentUser && authorization ) {
          // authorised so return true
          return true;
      }

      if( currentUser && !authorization )
        this.authService.logout();

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      this.alertService.presentToast("Necesitas estar logueado para realizar esa acción");
      return false;
  }
  
}
