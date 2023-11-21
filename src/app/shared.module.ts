import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

// antd components module
import { NgxPermissionsModule } from 'ngx-permissions'


const MODULES = [CommonModule, RouterModule, TranslateModule, NgxPermissionsModule]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
