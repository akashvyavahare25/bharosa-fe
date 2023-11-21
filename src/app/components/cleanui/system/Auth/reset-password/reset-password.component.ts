import { Component } from '@angular/core'
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cui-system-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../style.component.scss'],
})
export class ResetPasswordComponent{
  form:any
  tokenid:any
  isVerfied:boolean=false
  email:any
  // confirmpassword:any
  // newpassword:any
  error:any
  defaulterror:any="Password between 8 and 20 characters, must contain at least one letter, one numeric digit, and one special character"
  
  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute,private router: Router){
    this.route.params.subscribe(params => {
      this.tokenid = params['id']
    })
    let data={
      token:this.tokenid
    }
    // this.apiService.verfyToken(data).subscribe(res=>{
    //   if(res.success)
    //   {
    //     this.isVerfied=true
    //     this.email=res.success
    //   }
    //   else{
    //     this.isVerfied=false
    //   }
        
    // })
    this.error=this.defaulterror
    this.form = fb.group({
      newPassword: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
      confirmPassword:['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]]
    })
  }
  get newPassword() {
    return this.form.controls.newpassword
  }
  get confirmPassword() {
    return this.form.controls.confirmPassword
  }
  // matchPassword(event,texttype){
  //   if(this.form.valid)
  //   {
  //     if(this.newpassword.length>8)
  //     {
  //       if(texttype==='new')
  //       {
  //         this.error="password must be Same"
  //       }
  //       if(texttype==='confirm')
  //       {
  //         this.error="password must be Same"
  //       }
  //     }
  //   }
  //   else{
  //     this.error=this.defaulterror
  //   }
    
  // }
  getYear(){
    return new Date().getFullYear()
  }
  submitForm(): void {
    if (this.form.invalid ) {
      // this.notification.error('Error', 'Please Enter valid  password!')
      return
    }
    else{
      if(this.form.value.newPassword===this.form.value.confirmPassword)
      {
        const data={
          password:this.form.value.newPassword,
          email:this.email,
          token:this.tokenid
        }
        // this.apiService.resetPassword(data).subscribe(res=>{
        //   this.notification.success('Success','Your password has been changed successfully')
        //   this.form.reset()
        //   this.router.navigate(['auth/login'])
        // })
      }
      else{
        // this.notification.error('Error', 'Please check new password and confirm password value must be same!')
      }
    }
  }

}
