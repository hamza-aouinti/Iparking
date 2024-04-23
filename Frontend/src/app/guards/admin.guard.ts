import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private auth: AuthService,private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
            if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'supA') {
              return true;
            }
            else
            {
              this.router.navigate(['/welcome']);
              return false;
            }

          }


}
