import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-catg-list',
  templateUrl: './catg-list.component.html',
  styleUrls: ['./catg-list.component.css']
})
export class CatgListComponent implements OnInit {

  constructor(private rest : RestService , private router: ActivatedRoute , private SpinnerService: NgxSpinnerService) { }
  langId = "1"
  count = "5"
  current = 1
  id;
  Id = "5"
  newsArr = []

  ngOnInit() {
    // this.SpinnerService.show();  
    // this.router.params.subscribe(params => {
    //   this.id = params['id']; // (+) converts string 'id' to a numbe
    //   this.rest.getNewsByCatg(this.langId,this.Id,this.count,this.current).subscribe((res:any)=>{
    //     for(let i = 0 ; i < res.length ; i++){
    //       res[i].Details = res[i].Details.split(" ").splice(0,30).join(" ");
    //     }
    //      for(let i = 0 ; i < res.length ; i++){
    //       res[i].Title = res[i].Title.split(" ").splice(0,10).join(" ");
    //     }
    //     this.newsArr = res
    //     console.log(res)
    //     this.SpinnerService.hide();  

    //   } )
    // });
  }
  gotToNextPage(){
    this.current = this.current + 1
    this.ngOnInit()
  }
  gotTopPrevPage(){
    if(this.current != 1){
      this.current = this.current - 1 
    }else{
      this.current = 1
    }
   this.ngOnInit()
  }

}
