import { Component } from '@angular/core'
//import { DatePipe } from '@angular/common'

@Component({
  selector: 'cui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(){
   
  }
  getYear(){
    return new Date().getFullYear();
  }
}
