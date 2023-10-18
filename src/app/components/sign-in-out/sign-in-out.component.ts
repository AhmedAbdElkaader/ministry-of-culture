import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-sign',
  templateUrl: './sign-in-out.component.html',
  styleUrls: ['./sign-in-out.component.css']
})
export class SignInOutComponent implements OnInit {
  form: FormGroup;
  formLogin: FormGroup;
  constructor(public rest: RestService , private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.form = new FormGroup({
      UserName: new FormControl("", Validators.required),
      Email: new FormControl("", Validators.required),
      Date: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required),
      ConfirmPassword: new FormControl("", Validators.required),
    })
    this.formLogin = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  register() {
    this.SpinnerService.show()
    let obj = this.form.value
    console.log(obj)
    this.rest.registerApi(obj).subscribe(res => {
      console.log(res)
      if (res) {
        this.SpinnerService.hide()
        this.rest.sendToken(res)
      }
    })
  }

  login() {
    this.SpinnerService.show();
    let obj = this.formLogin.value
    this.rest.loginApi(obj).subscribe((res: any) => {
      this.SpinnerService.hide();
      this.rest.sendToken(res)
    },
      (error: any) => {
        this.SpinnerService.hide();
        alert("email or password is incorrect")
        console.log(error)
      }
    )
  }



}
