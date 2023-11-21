import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as _ from 'lodash'

import { MenuService } from 'src/app/services/menu'
import { DatePipe } from '@angular/common'
let _this: any;
let self: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuColor: String
  isMenuShadow: Boolean
  isMenuUnfixed: Boolean
  isSidebarOpen: Boolean
  isMobileView: Boolean
  leftMenuWidth: Number
  isMenuCollapsed: Boolean
  logo: String
  logoImage: any
  menuData: any[]
  menuDataActivated: any=[]
  role: String
  imageToShow: any
  visible:boolean
  entityName:any;
  imageSrc: string = '/assets/images/experian_logo.png'
  userPermission: any
  dataArray: any = []
  userData: any
  isShown: boolean = false
  screenResponse: any = []
  tagLine: any
  report1:any = [];
  report2:any = [];
  report3:any = [];
  rowData: any;
  gridOptions: any;
  gridOptions1:any;
  gridApi: any;
  month:any
  report3Date:any
  columnDefs:any = [
    // { field: 'User Name', headerName: 'User Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // { field: 'Report Name', headerName: 'Report Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // { field: 'Date Submitted', headerName: 'Date Submitted', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // // {
    //   field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
    // }
  ]
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private datePipe: DatePipe,

  ) {/* this.router.navigate(['appscreen/dashboard']) */
    this.userPermission = JSON.parse(localStorage.getItem('permissionData'))
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state
    })
}

  ngOnInit(): void {   
  }
 
}
