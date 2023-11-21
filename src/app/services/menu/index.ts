import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { getMenuData } from './config'

import * as _ from 'lodash'
import { AuthGuard } from 'src/app/components/cleanui/system/Guard/auth.guard'
import { Store, select } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
//import { SearchService } from '../search.service'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  appMastersData: any = []
  screensData: any = []
  preMenuData: any = []
  dashboardData: any = []
  screenPermissionData: any
  screenPermission: any
  userData: any
  PermissionData:any
  userInfo: any
  // searchData: any = [];
  public currentArrSubject: BehaviorSubject<[]> = new BehaviorSubject<[]>([])
  constructor(
   
    private store: Store<any>, // private searchService: SearchService,
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.screenPermissionData = localStorage.getItem('permissionData')
    })
  }

  getMenuData(): BehaviorSubject<any[]> {
    this.preMenuData = _.filter(getMenuData, o => {
      return !o.isCustomAdd
    })
    // this.appMasterService.getMenuAppMasterData().subscribe(res => {
    //   this.appMastersData = res
    //   this.screenService.getMenuScreenData().subscribe(res => {
    //     this.screensData = res
    //   //  this.dashboardService.getMenuDasbhoard().subscribe((response) => {
    //     //this.dashboardData = response;
    //     // this.searchService.getAllSearchData().subscribe(res => {
    //     //   this.searchData = res;
    //     // if (this.appMastersData.length > 0) {
    //       if (_.includes(this.userInfo.role, 'superAdmin')) {
    //         this.appMastersData.forEach((element, index) => {
    //           let screenArray = _.filter(this.screensData, { application_master: element.ID })
    //           // let searchArray = _.filter(this.searchData, { 'application_master': element._id });
    //           // let dashboardArray = _.filter(this.dashboardData, { appName: element._id })
    //           let obj = {
    //             title: element.NAME,
    //             key: 'icons',
    //             icon: 'fe fe-star',
    //             children: [
    //               // {
    //               //   title: 'Dashboard',
    //               //   key: 'dashboard',
    //               //   permission: ['app-dashboard', 'superAdmin'],
    //               //   //children: [],
    //               //   url: `/appscreen/dashboard/${element._id}/${element.name}`,
    //               // },
    //               {
    //                 title: 'Dataset',
    //                 key: 'dataset',
    //                 permission: ['-', 'superAdmin'],
    //                 children: [],
    //                 url: `/appscreen/dataset`,
    //               },
    //               // {
    //               //   title: 'View Report',
    //               //   key: 'report',
    //               //   icon: 'fe fe-file',
    //               //   permission: ['-', 'superAdmin'],
    //               //   url: `/appscreen/report/${element.name}`,
    //               // },
    //             ],
    //             isCustomAdd: true,
    //             permission: [element._id, 'superAdmin'],
    //           }

    //           //this.getDashboard(dashboardArray, element, obj.children[0])
    //           this.getDataSet(screenArray, element, obj.children[0])
    //           //this.getSearch(searchArray, element, obj.children[2]);
    //           // this.getReport(screenArray, element, obj.children[2]);
    //           this.preMenuData.push(obj)
    //         })

            
    //       } else {

    //         this.PermissionData =JSON.parse(localStorage.getItem('permissionData'))
    //        /* else{
       
    //         }  */   
              
    //         // {
    //         //   title: 'Dashobaord',
    //         //   key: 'dashboard',
    //         //   // icon: 'fa-solid fa-chart-line',
    //         //   permission: ['-'],
    //         //   url: `/appscreen/dashboard`,
    //         // },
    //         this.screensData.forEach((screenElement, index) => {
    //           if (
    //             _.includes(this.screenPermissionData, screenElement._id + ':all') &&
    //             _.includes(this.screenPermissionData, screenElement._id + ':create')
    //           ) {
    //             let screenObj = {
    //               title: screenElement.externalCode,
    //               key: 'iconsFeatherIcons',
    //               icon: 'fe fe-monitor',
    //               permission: [screenElement._id + ':all', 'superAdmin'],
    //               url: `/appscreen/all/${screenElement.name}/${screenElement._id}/${screenElement.application_master}`,
    //             }
    //             this.preMenuData.push(screenObj)
    //           } else if (_.includes(this.screenPermissionData, screenElement._id + ':create')) {
    //             if (_.includes(this.PermissionData, 'user')) {
    //               let screenObj = {
    //                 title: screenElement.externalCode,
    //                 key: 'iconsFeatherIcons',
    //                 icon: 'fe fe-monitor',
    //                 permission: [screenElement._id + ':create', 'superAdmin'],
    //                 url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
    //               }
    //               this.preMenuData.splice(1,0,screenObj)
    //             }
    //             else
    //             {
    //             let screenObj = {
    //               title: screenElement.externalCode,
    //               key: 'iconsFeatherIcons',
    //               icon: 'fe fe-monitor',
    //               permission: [screenElement._id + ':create', 'superAdmin'],
    //               url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
    //             }
    //             this.preMenuData.push(screenObj)
    //           }
    //           } else if (_.includes(this.screenPermissionData, screenElement._id + ':all')) {
    //             let screenObj = {
    //               title: screenElement.externalCode,
    //               key: 'iconsFeatherIcons',
    //               icon: 'fe fe-monitor',
    //               permission: [screenElement._id + ':all', 'superAdmin'],
    //               url: `/appscreen/all/${screenElement.name}/${screenElement._id}/${screenElement.application_master}`,
    //             }
    //             this.preMenuData.push(screenObj)
    //             this.preMenuData.push(
    //               {
    //                 title: 'View submission status',
    //                 key: 'filestatus',
    //                 icon: 'fa fa-table',
    //                 url: '/filestatus',
    //                permission: ['-', 'superAdmin','user','superDataAdmin','admin'],
    //             } )   
    //           }
    //         })
    //         if (_.includes(this.PermissionData, 'user')) {
    //           this.preMenuData.splice(2 ,0,
    //             {
    //               title: 'View submission status',
    //               key: 'filestatus',
    //               icon: 'fa fa-table',
    //               url: '/filestatus',
    //               permission: ['-', 'superAdmin', 'user', 'superDataAdmin', 'admin'],
    //             }) 
    //         }
    //         else
    //         {
    //         this.preMenuData.push(
    //           {
    //             title: 'View submission status',
    //             key: 'filestatus',
    //             icon: 'fa fa-table',
    //             url: '/filestatus',
    //             permission: ['-', 'superAdmin', 'user', 'superDataAdmin', 'admin'],
    //           }) 
    //         }
    //         if (_.includes(this.PermissionData, 'superDataAdmin') || _.includes(this.PermissionData, 'superAdmin')) {
              
    //           this.preMenuData.splice(this.preMenuData.length - 1,0,{
    //             title: 'View Report',
    //             key: 'report',
    //             icon: 'fe fe-file',
    //             permission: ['-'],
    //             url: `/appscreen/report`,
    //           }  )  
    //         }
    //         if (_.includes(this.PermissionData, 'superDataAdmin') || _.includes(this.PermissionData, 'superAdmin')) {
              
    //           this.preMenuData.splice(4,0,   {
    //             title: 'Maintain Resource Center ',
    //             key: 'resourcecenter ',
    //             icon: 'fe fe-folder',
    //             url: '/resource/list',
    //             permission: ['-'],
    //           } )  
    //         }
    //         if (_.includes(this.PermissionData, 'user')) {
    //           this.preMenuData.splice(this.preMenuData.length,0,   {
    //             title: 'Resource Center ',
    //             key: 'resourcecenter ',
    //             icon: 'fe fe-folder',
    //             url: '/resource/list',
    //             permission: ['-'],
    //           } )  
    //         }
    //       }

       
    //       // })
    //     // }
    //     this.currentArrSubject.next(this.preMenuData)
    //    // })
    // //   })
    // })
    // })
    return this.currentArrSubject
  }

  clearData() {
    this.currentArrSubject.next([])
  }

  getDataSet(screenArray, element, obj) {
    if (element._id === '6050605b1ad41034c109b1bf') {
      const name = 'gamma'
      let screenObj = {
        title: 'Dashboards',
        key: 'iconsFeatherIcons',
        permission: ['-', 'superAdmin'],
        url: '/contract/create-contract',
        children: [
          {
            title: 'Dashobaord',
            key: 'dashboard',
            permission: ['-', 'superAdmin'],
            url: `/appscreen/dashboard`,
          },
        ],
      }
      obj.children.push(screenObj)
    }
    screenArray.forEach((screenElement, index) => {
      if (
        screenElement.type !== 'searchInput' &&
        screenElement.type !== 'searchOutput' &&
        screenElement._id !== '6053073f21ed7a40a1a3edcf'
      ) {
        let permissions = []
        if (element._id === '6050605b1ad41034c109b1bf') {
          permissions = ['-', '-']
        } else {
          permissions = [screenElement._id + ':all', 'superAdmin']
        }
        let screenObj = {
          title: screenElement.name,
          key: 'iconsFeatherIcons',
          permission: [screenElement._id, 'superAdmin'],
          url: '/contract/create-contract',
          children: [
            {
              title: 'Create',
              key: 'create',
              permission: [screenElement._id + ':create', 'superAdmin'],
              url: `/appscreen/create/${screenElement.name}/${screenElement.code}`,
            },
            {
              title: 'All',
              key: 'all',
              permission: [screenElement._id + ':all', 'superAdmin'],
              url: `/appscreen/all/${screenElement.name}/${screenElement.code}/${screenElement._id}/${screenElement.application_master}`,
            },
            // {
            //   title: 'View Report',
            //   key: 'report',
            //   icon: 'fe fe-file',
            //   permission: ['superAdmin'],
            //   url: `/appscreen/report/${screenElement.name}/${screenElement.code}`,
            // },
          ],
        }
        obj.children.push(screenObj)
      } else if (screenElement._id === '6053073f21ed7a40a1a3edcf') {
        let screenObj = {
          title: screenElement.name,
          key: 'iconsFeatherIcons',
          permission: [screenElement._id, 'superAdmin'],
          url: '/contract/create-contract',
          children: [
            {
              title: 'Contact',
              key: 'Contact',
              permission: [screenElement._id + ':create', 'superAdmin'],
              url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
            },
          ],
        }
        obj.children.push(screenObj)
      } else {
        let screenObj = {
          title: screenElement.name,
          key: 'iconsFeatherIcons',
          permission: [screenElement._id, 'superAdmin'],
          url: '/contract/create-contract',
          children: [
            {
              title: 'Search',
              key: 'create',
              permission: [screenElement._id + ':create', 'superAdmin'],
              url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
            },
          ],
        }
        obj.children.push(screenObj)
      }
    })
  }

  // getDashboard(dashboardArray, element, obj) {
  //   dashboardArray.forEach(dashboard => {
  //     let dashboardObj = {
  //       title: dashboard.name,
  //       key: 'iconsFeatherIcons',
  //       permission: [dashboard._id, 'superAdmin'],
  //       url: `/appscreen/dashboard/${dashboard._id}`,
  //     }
  //     obj.children.push(dashboardObj)
  //   })
  // }

  // getSearch(searchArray, element, obj) {
  //   searchArray.forEach((search) => {
  //     let searchdObj = {
  //       title: search.name,
  //       key: 'iconsFeatherIcons',
  //       permission: [search.name, 'admin', 'superAdmin'],
  //       url: `/appscreen/search/${search._id}`,
  //     }
  //     obj.children.push(searchdObj);
  //   });
  // }

  /*   getReport(screenArray, element, obj) {
      let dashboardObj = {
        title: 'Report',
        key: 'report',
        permission: [screenElement.name + ':all', 'admin'],
        url: `/appscreen/report/${screenElement.name}/${screenElement.code}`,
      }
      obj.children.push(dashboardObj);
    } */
}
