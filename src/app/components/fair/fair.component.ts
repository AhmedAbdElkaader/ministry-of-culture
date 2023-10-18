import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.css']
})
export class FairComponent implements OnInit {

  subscription: Subscription;
  fairArr = []
  LangId = "1";
  count = "6"
  current = 1
  lang
  showMasg: boolean = false

  constructor(public rest: RestService, private router: Router) { }

  ngOnInit() {
    this.rest.setTitle(" المعارض - بوابة الثقافة");
    this.getFairData()
    this.lang = this.rest.checkLang()
  }

  getFairData() {
    this.rest.getFairApi(this.LangId, this.count, this.current).subscribe((res: any) => {
      console.log('fair res :: ', res)
      if (res.length == 0) {
        this.showMasg = true
      } else {
        for (let i = 0; i < res.length; i++) {
          res[i].Name = res[i].Name.split(" ").splice(0, 5).join(" ");
        }
        this.fairArr = res
      }
    })
  }

  onScroll() {
    this.current = this.current + 1
    this.rest.getFairApi(this.LangId, this.count, this.current).subscribe((res: any) => {
      console.log(res)
      if (res.length != 0) {
        for (let i = 0; i < res.length; i++) {
          res[i].Name = res[i].Name.split(" ").splice(0, 5).join(" ");
          this.fairArr.push(res[i])
        }
      }
    })
  }

  goToDet(id) {
    this.router.navigate(['/fairdet', id]);
  }




}
