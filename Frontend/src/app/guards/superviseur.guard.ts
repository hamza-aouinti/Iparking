import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperviseurGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {}




canActivate(route: ActivatedRouteSnapshot): boolean {
  // this will be passed from the route config
  // on the data property

  if (localStorage.getItem('role') === 'sup' || localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'supA') {
    return true;
  } else {
    this.router.navigate(['/welcome']);
    return false;
  }

    }

}
