import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import store from 'store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from './actions'
import { NgxPermissionsService } from 'ngx-permissions'
import * as _ from 'lodash'
import { InterfaceService } from 'src/app/services/interface.service'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private mainService: InterfaceService,
    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
    private permissionsService: NgxPermissionsService,
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }

  // tslint:disable-next-line: member-ordering
  @Effect()
  login: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGIN),
    map((action: UserActions.Login) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // backend login
      return from(
        this.mainService.getDataById({ email: payload.email, password: payload.password }),
      ).pipe(
        map(data => {
        
          // this.notification.success('Success', 'You have Successfully logged in')
          const userData = {
            id: data.user._id,
            name: data.user.userName,
            role: ['superAdmin'],
            avatar: '',
            customer: data.customerData,
            accessToken: data.token,
            email: data.user.email,
            code: data.user.code,
            phone: data.user.phone,
            companyName: data.user.companyName,
            authorized: true,
            loading: false,
          }
          const userInfo = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: ['superAdmin'],
            code: data.user.code,
            phone: data.user.phone,
            company: data.customerData,
          }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('companyName', data.user.companyName)
       
            const permissionData = []
       
            permissionData.push('-')
            permissionData.push('superAdmin')
               userData['userPermission'] = permissionData;
            localStorage.setItem('permissionData', JSON.stringify(permissionData))
            this.permissionsService.loadPermissions(permissionData)
            userData['userPermission'] = permissionData
          // } else {
          //   const permissionData = []
          //   permissionData.push(data.user.roles[0])
          //   localStorage.setItem('permissionData', JSON.stringify(permissionData))
          //   this.permissionsService.loadPermissions(permissionData)
          //   userData['userPermission'] = permissionData
          // }
          // if (data.customerData) {
          //   localStorage.setItem('customerData', JSON.stringify(data.customerData))
          // }
          localStorage.setItem('jwtToken', data.token)
          if (this.route.snapshot.queryParams.returnUrl) {
            this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
          } else if (this.router.url.includes('/auth')) {
            this.router.navigate(['/']) // redirect to root route on auth pages
          }
          return new UserActions.LoginSuccessful(userData)
        }),
        catchError((error: any) => {
          console.log(error)
          if (error.error.statusCode === 409) {
            // this.notification.warning('Login Failed ', 'User Not Found')
          } else {
            if (error.error.statusCode === 401) {
              // this.notification.warning('Login Failed', 'Incorrect Password')
            } else {
              // this.notification.warning(error.error.statusCode, error.error.message)
            }
          }

          return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  // tslint:disable-next-line: member-ordering
  /* @Effect()
  register: Observable<any> = this.actions.pipe(
    ofType(UserActions.REGISTER),
    map((action: UserActions.Register) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // firebase register
      return from(
        
      ).pipe(
        map(() => {
          return new UserActions.EmptyAction()
        }),
        catchError(error => {
          this.notification.warning(error.code, error.message)
          return from([{ type: UserActions.EMPTY_ACTION }])
        }),
      )
    }),
  )
 */
  // tslint:disable-next-line: member-ordering
  @Effect()
  loadCurrentAccount: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT),
    map(() => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([, settings]) => {
      // jwt load current account
      if (localStorage.getItem('jwtToken')) {
        return from(
          this.mainService.getDataById('d').pipe(
            map(data => {
              const customerData = JSON.parse(localStorage.getItem('customerData'))
              const userData = {
                id: data._id,
                name: data.userName,
                role: ['superAdmin'],
                avatar: '',
                email: data.email,
                code: data.userCode,
                phone: data.phone,
                //logo:customerData.logo,
                authorized: true,
                loading: false,
                userPermission: JSON.parse(localStorage.getItem('permissionData')),
              }
              if (customerData) {
                userData['customer'] = customerData
              }
              return new UserActions.LoadCurrentAccountSuccessful(userData)
            }),
            catchError((error: any) => {
              // this.notification.warning(error.code, error.message)
              return from([{ type: UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL }])
            }),
          ),
        )
      } else {
        return of(new UserActions.FlushUser())
      }
    }),
  )

  // tslint:disable-next-line: member-ordering
  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGOUT),
    map((action: UserActions.Logout) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([, settings]) => {
      localStorage.clear()
      store.remove('accessToken')
      this.router.navigate(['/auth/login'])
      return of(new UserActions.FlushUser())
      // firebase logout
      // return from(this.firebaseAuthService.logout()).pipe(
      //   map(() => {
      //     store.remove('accessToken')
      //     this.router.navigate(['/auth/login'])
      //     return new UserActions.FlushUser()
      //   }),
      // )
    }),
  )
}
