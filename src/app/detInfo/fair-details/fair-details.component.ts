import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-fair-details',
  templateUrl: './fair-details.component.html',
  styleUrls: ['./fair-details.component.css']
})
export class FairDetailsComponent implements OnInit {
  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl; 

  subscription: Subscription;
  langId = "1"
  id
  Name
  Id
  Image
  Des
  sDate
  eDate
  urlLink
  Subscriptions
  showIframe : boolean = false
  constructor(public rest: RestService, private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private SpinnerService: NgxSpinnerService,
     private rout: Router) { }

  ngOnInit() {
    this.SpinnerService.show()
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getFairDetails(this.id, this.langId).subscribe((res : any) =>{

        this.showIframe = true
        this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=fairs`
        this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 3000);

        this.rest.setTitle( res.Name + " - بوابة الثقافة " );
        console.log('res :: ', res)
        this.id = res.ID
        this.Name = res.Name
        this.Image = res.Image
        this.Des = res.Description
        this.sDate = res.StartDate
        this.eDate = res.EndDate
        this.Subscriptions = res.SubscriptionTypes
      })
   });
  }

  goToDet(id) {
    let token = localStorage.getItem("tokenData")
    if(token == null){
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    }else{
      this.rout.navigate(['/fairapply', id]);
    }
  }

}
