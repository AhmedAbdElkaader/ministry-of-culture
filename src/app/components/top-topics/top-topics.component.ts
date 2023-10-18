import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-top-topics',
  templateUrl: './top-topics.component.html',
  styleUrls: ['./top-topics.component.css']
})
export class TopTopicsComponent implements OnInit {

  nameEvent:string;
  dateEvent:string
  imgEvent:string;

  nameReles:string;
  imgReles:string;

  nameNews:string;
  imgNews:string;
  dateNews:string;

  nameArtWorks:string;
  imgArtWorks:string;
  dateArtWork:string;

  constructor(public rest : RestService) { }

  ngOnInit() {

  //   this.rest.getSecoundPart().subscribe((res :any) => {
  //     // this.nameReles = res.Releases[0].Title
  //     // this.imgReles  = res.Releases[0].ImagePath

  //     this.nameArtWorks = res.ArtWorks[0].Name
  //     this.imgArtWorks = res.ArtWorks[0].image
  //     this.dateArtWork = res.ArtWorks[0].Date

  //     this.nameNews = res.News[0].CategoryNews[0].Title
  //     this.dateNews = res.News[0].CategoryNews[0].Date
  //     this.imgNews = res.News[0].CategoryNews[0].ImagePath
  //   })
  //   this.rest.getData().subscribe((res : any) => {
  //     this.nameEvent = res.RecentEvent.Events[0].Name
  //     this.imgEvent = res.RecentEvent.Events[0].Image
  //     this.dateEvent = res.RecentEvent.Events[0].date;
  // })

  }

}
