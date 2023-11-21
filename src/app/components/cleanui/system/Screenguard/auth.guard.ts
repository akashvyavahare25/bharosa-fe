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
  role: string;

  constructor(
    private store: Store<any>,
    public router: Router,
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.role = state.role;
      this.authorized = state.authorized
      this.userPermission = JSON.parse(localStorage.getItem("permissionData"));
    })
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
      let name :any
      if(next.params.id){
        name = next.params.id + next.data.permission
      }else{
         name = next.params.screenId + next.data.permission
      }
     
      if (_.includes(this.userPermission, name) || _.includes(this.role,'superAdmin')|| _.includes(this.role,'admin') || _.includes(this.role,'user') ||  _.includes(this.userPermission, 'user') || _.includes(this.userPermission, 'admin')||  _.includes(this.userPermission, 'superAdmin') || _.includes(this.role,'superDataAdmin') ||  _.includes(this.userPermission, 'superDataAdmin')) {
        return true
      } else {
        // this.router.navigate(['/appscreen/dashboard'])
        this.router.navigate(['/home'])
        setTimeout(() => {
          // this.notification.error('Error', "You don't have permisson!")
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
