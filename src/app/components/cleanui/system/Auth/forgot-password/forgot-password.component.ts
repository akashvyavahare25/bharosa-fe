import { Component } from '@angular/core'
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cui-system-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../style.component.scss'],
})
export class ForgotPasswordComponent{
  form:any
  setPassword:Boolean=false
  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        if(params.name){
          this.setPassword=true
        }
      })
    this.form = fb.group({
      // email:  ['', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.maxLength(50),
      //   Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"),
      //   Validators.required, Validators.pattern(/^(\d{10}|[A-Za-z0-9.]{2,}[@]{1}[a-z]{2,}[.]{1}[a-z]{2,})$/)
      // ])]
      email: ['', [Validators.required, Validators.minLength(4)]],
    })
  }
  get email() {
    return this.form.controls.email
  }
  getYear(){
    return new Date().getFullYear()
  }
  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    if (this.email.invalid ) {
      return
    }
    else{
      const data={
        email:this.email.value
      }
      // this.apiService.forgotPassword(data).subscribe(res=>{
      //   this.notification.success('Success','We have e-mailed your password reset link!')
      //   this.form.reset()
      // },error=>{
      //   this.notification.error('Failed',"Unregistered Email Id")
      // })
    }
  }

}
