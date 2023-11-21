import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import {  Router } from '@angular/router'

@Component({
  selector: 'cui-system-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style.component.scss'],
})
export class RegisterComponent {
  form: UntypedFormGroup
  loading: boolean = false

  constructor(private fb: UntypedFormBuilder, private store: Store<any>,
    private router: Router) {
    this.form = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [, [Validators.required, Validators.minLength(4)]],
     // password: ['123456@a', [Validators.required]],
      roles: [['user'], [Validators.required]],
      companyName: ['632aa6741eca1b575fe1459f',],
      phone:[,[Validators.required, Validators.maxLength(4)]],
      groupId:[null,Validators.required]
    })
   
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }
  get name() {
    return this.form.controls.name
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    // this.password.markAsDirty()
    // this.password.updateValueAndValidity()
    
    if (this.email.invalid) {
      return
    }

    // this.apiService.registerUser(this.form.value).subscribe((res) => {
    //   this.router.navigate(['/auth/set-password'])
    // })
    const payload = {
      email: this.email.value,
    //  password: this.password.value,
      firstName: this.form.value.firstName,
      lastName:this.form.value.lastName,
      roles:this.form.value.roles
    }
    this.store.dispatch(new UserActions.Register(payload))
  }
}
