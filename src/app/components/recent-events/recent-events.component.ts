import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.css']
})
export class RecentEventsComponent implements OnInit {

  listArr;
  eventsArr = [];
  bntStyle: string;
  bool: boolean = false
  slectOptionArr;
  entit = []
  subscription: Subscription;
  events = "الأحداث الأخيرة"
  styles = "caption";
  langId

  imageForEvent;
  desForEvents;
  DateForEvents;
  idForEvent;

  cardImage;
  cardName;
  cardDateNumberDay;
  cardDateNameDay;
  cardDateNameMonth
  currentItem: any;
  private pointer: number = 0;
  responsNotEmpthy = false

  gawlaSkafia = 'الجولة الثقافية'

  SlideOptions = { items: 1, dots: false,
    autoplay: true,
    // slideTransition: 'linear',
    // autoplaySpeed: 6000,
    autoplayTimeout:4000,
    smartSpeed:2000,
    margin:20,
    autoplayHoverPause: true,
     nav: true ,
     navText: ["<i class='fa fa-angle-right angleLeftEvent'></i>", "<i class='fa fa-angle-left  angleRightEvent'></i>"],
     loop:true,};  
  CarouselOptions = { dots: true, nav: true };  
  Images = [];  
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.Images = []
    this.pointer = 0
    this.subscription = this.rest.getObsrevalData().subscribe((res: any) => {
      if (res.RecentEvent.Events.length == 0) {
        this.responsNotEmpthy = false
      }else{
        this.responsNotEmpthy =  true
      
        this.eventsArr = res.RecentEvent.Events

      console.log("hi" , res)
      this.imageForEvent = ""
      this.desForEvents = ""
      this.DateForEvents = ""
      this.pointer = 0
      for (let i = 0; i < this.eventsArr.length; i++) {
        this.Images.push(this.eventsArr[i].image)
        if (this.pointer != i) {
          this.eventsArr[i].isActive = false
        }
      }
      if (res.state == "en") {
        this.events = "Recent Events"
        this.styles = "captionEng"
        this.langId = 2
        this.gawlaSkafia = "Cultural Tour"
      } else if (res.state == "ar") {
        this.events = "الأحداث الأخيرة"
        this.styles = "caption"
        this.langId = 1
        this.gawlaSkafia = 'الجولة الثقافية'
      } else if (res.state == "fr") {
        this.events = "Événements récents"
        this.styles = "captionEng"
        this.langId = 3
        this.gawlaSkafia = 'Visite culturelle'
      }
      this.sortData()
      // this.imageForEvent = this.eventsArr[0].image
      // this.desForEvents = this.eventsArr[0].Name
      // this.DateForEvents = this.eventsArr[0].StartDate
      // this.idForEvent = this.eventsArr[0].ID
      // this.eventsArr[0].isActive = true

      // setInterval(() => {
      //   if (this.pointer < this.eventsArr.length) {
      //     if (this.pointer != 0) {
      //       this.eventsArr[this.pointer].isActive = true
      //       this.eventsArr[this.pointer - 1].isActive = false
      //       this.imageForEvent = this.eventsArr[this.pointer].image
      //       this.desForEvents = this.eventsArr[this.pointer].Name
      //       this.DateForEvents = this.eventsArr[this.pointer].StartDate
      //       this.idForEvent = this.eventsArr[this.pointer].ID

      //     }
      //     this.pointer++
      //   } else {
      //     this.pointer = 0
      //     this.eventsArr[this.pointer].isActive = true
      //     this.imageForEvent = this.eventsArr[this.pointer].image
      //     this.desForEvents = this.eventsArr[this.pointer].Name
      //     this.DateForEvents = this.eventsArr[this.pointer].StartDate
      //     this.idForEvent = this.eventsArr[this.pointer].ID
      //     this.pointer++
      //     this.eventsArr[this.eventsArr.length - 1].isActive = false
      //   }
      // }, 3000);

      // this.entit = res.Entities
      // this.listArr = res.RecentEvent.Categories
      // this.bntStyle = "arabic"
      // this.slectOptionArr = res.RecentEvent.Categories
      }
    })
  }

  // changeContent(id: any): any {
  //   for (let i = 0; i < this.eventsArr.length; i++) {
  //     if (this.eventsArr[i].ID == id) {
  //       this.imageForEvent = this.eventsArr[i].image
  //       this.desForEvents = this.eventsArr[i].Name
  //       this.DateForEvents = this.eventsArr[i].Date
  //       this.idForEvent = this.eventsArr[i].ID
  //       this.eventsArr[i].isActive = !this.eventsArr[i].isActive
  //       this.pointer = i
  //     } else {
  //       this.eventsArr[i].isActive = false
  //     }
  //   }
  // }

  gotToDet(id) {
    this.router.navigate(['/Eventsdetels', id]);
    this.rest.sendRout("evnets")
  }



  sortData() {
    this.eventsArr.sort((a, b) => {
      return <any>new Date(b.StartDate) - <any>new Date(a.StartDate);
    });
    let item = moment().format();
    console.log(item)
    console.log(this.eventsArr)

   
    if (this.eventsArr[0].StartDate >= item) {

      for (let i = this.eventsArr.length -1 ; i >= 0; i--) {

        if(this.eventsArr[i] > item){

          this.cardImage = this.eventsArr[i].image
          this.cardName = this.eventsArr[i].Name
    
          this.cardDateNumberDay = this.eventsArr[i].StartDate
          this.cardDateNameDay = this.eventsArr[i].StartDate
          this.cardDateNameMonth = this.eventsArr[i].StartDate
    
          if(this.langId == 1){
            this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("ar").format("D");
            this.cardDateNameDay = moment(this.cardDateNameDay).lang("ar").format("dddd");
            this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("ar").format("MMMM");
          }else if(this.langId == 2){
            this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("en").format("D");
            this.cardDateNameDay = moment(this.cardDateNameDay).lang("en").format("dddd");
            this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("en").format("MMMM");
          }else{
          this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("fr").format("D");
          this.cardDateNameDay = moment(this.cardDateNameDay).lang("fr").format("dddd");
          this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("fr").format("MMMM");
          }
          break
        }
      }

      console.log("done")
    } else {
      for (let i = 0; i < this.eventsArr.length; i++) {
        
        if (this.eventsArr[i].StartDate < item) {
          this.cardImage = this.eventsArr[i].image
          this.cardName = this.eventsArr[i].Name

          this.cardDateNumberDay = this.eventsArr[i].StartDate
          this.cardDateNameDay = this.eventsArr[i].StartDate
          this.cardDateNameMonth = this.eventsArr[i].StartDate

          if(this.langId == 1){
            this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("ar").format("D");
            this.cardDateNameDay = moment(this.cardDateNameDay).lang("ar").format("dddd");
            this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("ar").format("MMMM");
          }else if(this.langId == 2){
            this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("en").format("D");
            this.cardDateNameDay = moment(this.cardDateNameDay).lang("en").format("dddd");
            this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("en").format("MMMM");
          }else{
          this.cardDateNumberDay = moment(this.cardDateNumberDay).lang("fr").format("D");
          this.cardDateNameDay = moment(this.cardDateNameDay).lang("fr").format("dddd");
          this.cardDateNameMonth = moment(this.cardDateNameMonth).lang("fr").format("MMMM");
          }
          break
        }
      }
    }
    console.log(this.eventsArr)
  }
}
