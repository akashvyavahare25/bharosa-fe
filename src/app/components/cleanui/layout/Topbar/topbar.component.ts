import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import { MenuService } from 'src/app/services/menu'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
//import { environment } from 'ng-zorro-antd'
import { environment } from 'src/environments/environment'
import { stat } from 'fs'
@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  entityName:any
  tagLine:any
  userData:any 
  constructor(private menuService: MenuService, private store: Store<any>, private router: Router) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => { 

      this.userData = state
      // if(_.includes(state.role,'superAdmin') || _.includes(state.role,'superDataAdmin')){
      //   this.companyName= 'Welcome ' + state.name
      // }
      // else{
        if(state.customer){
          this.entityName=state.customer.entityName
          this.tagLine=state.customer.tagLine
        }
        
      // }
     
    })
  }
}
