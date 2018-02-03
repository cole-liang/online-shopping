import { AuthService } from './auth.service';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.authService.user$.map(user => {
      if(user) return true;
      this.router.navigate(['/login'], { queryParams: {returnUrl: state.url} });
      return false;
    });
    
  }
}
