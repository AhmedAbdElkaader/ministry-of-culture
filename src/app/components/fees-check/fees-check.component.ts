import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-fees-check',
  templateUrl: './fees-check.component.html',
  styleUrls: ['./fees-check.component.css']
})
export class FeesCheckComponent implements OnInit {

  fessIsPayed = false
  statusPayment
  masgeOfPay
  masge ;
  constructor(private rest: RestService ,  private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.SpinnerService.show();  

    this.statusPayment = localStorage.getItem('statusPayment');

    this.masgeOfPay = localStorage.getItem('pendMasg');

    this.rest.checkFessIfPayed().subscribe((res: any) => {
      console.log(res)
      if (res.data.status == 'PENDING') {
        if(this.statusPayment != 'Card'){
          this.masge = this.masgeOfPay
          this.fessIsPayed = false
        }else{
          this.masge = 'عذرا لم يتم الدفع برجاء المحاولة مرة اخري'
          this.fessIsPayed = false
        }
      } else {
        this.fessIsPayed = true
      }

      this.SpinnerService.hide();  
    })
  }

}
