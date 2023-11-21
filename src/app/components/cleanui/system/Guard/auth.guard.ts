import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean
  userPermission: any;
  role: any;

  constructor(
    private store: Store<any>,
    public router: Router,
  ) {
    this.userPermission = JSON.parse(localStorage.getItem("permissionData"));
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
      this.role = state.role;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (environment.authenticated) {
      // skip guard checking on demo environment serve/build, remove it in your app
      return false
    }
    if ((this.authorized || localStorage.getItem('jwtToken'))) {
     
      if (_.includes(this.userPermission, next.data.permission) || _.includes(this.role,'superAdmin')|| _.includes(this.role,'admin') || _.includes(this.userPermission, 'admin') || _.includes(this.userPermission, 'superAdmin') || _.includes(this.role,'user') ||  _.includes(this.userPermission, 'user') || _.includes(this.role,'superDataAdmin') ||  _.includes(this.userPermission, 'superDataAdmin')) {
        return true
      }else {
        // this.router.navigate(['/appscreen/dashboard'])
        this.router.navigate(['/home'])
        setTimeout(() => {
        }, 700)
        return true
      }

    }

    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } })
    return false
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')
  }
}
