import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import { Router } from '@angular/router'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 7
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''
  userId:string = ''
  flag:boolean=true
  companyName:any
  constructor( private router: Router,private store: Store<any>) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.name = state.name
      this.role = state.role
      this.email = state.email
      this.userId=state.id
      if(state.code && state.phone){
        this.phone = state.code+' '+state.phone
      }
      if(state.customer){
        this.companyName = state.customer.name
      }
    })
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }
  renderToUser(){
    let obj={
      id:this.userId,
      obj:this.flag
    }
    this.router.navigate(['/profile/update', this.userId,this.flag])
  }
  logout() {
    this.store.dispatch(new UserActions.Logout())
  }
}
