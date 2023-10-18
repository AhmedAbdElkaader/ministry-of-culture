import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  subscription: Subscription;
  licenseArr = []
  LangId = "1";
  count='6'
  curent = 1
  showMasg:boolean = false
  lang

  constructor(public rest: RestService, private router: Router) { }

  ngOnInit() {

    this.rest.setTitle("التراخيص الفنية - بوابة الثقافة");

    this.getLicenseData()
    this.lang = this.rest.checkLang()
  }

  getLicenseData() {
    console.log('license data')
    this.rest.getArtLicenseApi(this.LangId,this.count,this.curent).subscribe((res:any)=>{
      console.log('license res :: ', res)
      if(res.length == 0){
        this.showMasg = true
      } else{
       this.licenseArr = res
      }
    })
  }

  goToDet(id) {
    // let token = localStorage.getItem("tokenData")
    // if(token == null){
    //   let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
    //   elment.click()
    // }else{
    // }
    this.router.navigate(['/licensedet', id]);
  }

}


