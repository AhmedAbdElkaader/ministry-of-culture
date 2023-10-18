import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";  
import {Router} from '@angular/router';

@Component({
  selector: 'app-news-minsistry',
  templateUrl: './news-minsistry.component.html',
  styleUrls: ['./news-minsistry.component.css']
})
export class NewsMinsistryComponent implements OnInit {

  categorieArr = []
  newsArr = []
  catgName:string;
  bntStyle: string;
  firstArr = [];
  secoundArr = []
  divStyle = "divSt"
  catgStyle = "text"
  header:string 
  subscription: Subscription;
  load = true
  lang
  showNews = false
  constructor(public rest :RestService , private SpinnerService: NgxSpinnerService , private router: Router) { }

  ngOnInit() {          
    this.subscription = this.rest.getObsData().subscribe((res :any) =>{
      console.log(res)
      if(res.state == "ar" && res.LatestNews.length > 0){
        this.header = "أحدث الأخبار"
        this.lang = 1
        this.showNews = true
      }else if(res.state == "en" && res.LatestNews.length > 0){
        this.header = "News Ministry of Culture"
        this.lang = 2
        this.showNews = true
      }else if(res.state == "fr" && res.LatestNews.length > 0){
        this.header = "Ministère de la Culture"
        this.lang = 3
        this.showNews = true
      }else{
        this.showNews = false
      }
       for(let i = 0 ; i < res.LatestNews.length ; i++){
        res.LatestNews[i].Name = res.LatestNews[i].Name.split(" ").splice(0,8).join(" ");
      }
      this.newsArr = res.LatestNews
        this.bntStyle = "arabic"
      })
  }

  gottoDet(id){
    this.router.navigate(['/detels', id]);
    this.rest.sendRout("news")
  }
  goToCatList(id){
    this.router.navigate(['/newsCat',id]);
    this.rest.sendRout("news")
  }

  // getCatregori(id , isActive){    
  //   for(let i = 0 ; i < this.categorieArr.length ; i++){
  //     if(this.categorieArr[i].Id == id){
  //       this.newsArr = this.resp.News[i].CategoryNews
  //       this.catgName = this.resp.News[i].CategoryName
  //       isActive.active = !isActive.active
  //     }else{
  //     this.categorieArr[i].active = false
  //     }
  //   }
  //   console.log(id)
  // }

}
