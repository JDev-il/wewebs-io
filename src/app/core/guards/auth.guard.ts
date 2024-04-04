import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    console.log(this.router.routerState);

    return true;
    // if (this.authService.isLoggedIn()) {
    //   return true;
    // } else {
    //   return this.router.navigate(['/login']);
    // }
  }
}
