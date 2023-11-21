import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/cleanui/system/Guard/auth.guard'

// layouts & notfound
import { LayoutAuthComponent } from 'src/app/layouts/Auth/auth.component'
import { LayoutsModule } from './layouts/layouts.module'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    data: { permission: '-' },
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   component: LayoutMainComponent,
  //   children: [
  //     {
  //       path: 'home',
  //       data: { permission: '-' },
  //       loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule),
  //     },
     
  //   ],
  // },
  
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
 
  
  {
    path: '**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: AppPreloader
}),
    LayoutsModule,
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule {}
