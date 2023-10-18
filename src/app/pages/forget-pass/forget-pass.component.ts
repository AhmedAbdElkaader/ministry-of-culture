import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {

  email = "";
  constructor(private rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }

  sendEmail() {
    this.SpinnerService.show()

    console.log(this.email)
    let obj = {
      Email: this.email
    }
    this.rest.forgetPassword(obj).subscribe(res => {
      console.log(res)
      if (res == "Your Password Changed Successfuly Blease Check Your Email") {
        alert("تم تغيير كلمة المرور الخاصة بك بنجاح يرجى التحقق من بريدك الإلكتروني")
        this.SpinnerService.hide()
      }else{
        alert("حدث خظأ يرجي ادخال البريد الالكتروني صحيح")
        this.SpinnerService.hide()
      }
    })
  }
}
