import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-art-works',
  templateUrl: './art-works.component.html',
  styleUrls: ['./art-works.component.css']
})
export class ArtWorksComponent implements OnInit {

  subscription: Subscription;
  artWorkArr = [];
  Events
  headers = "اعمال فنية";

  img: string;
  title: string;
  date: string;
  categori: string;

  img1: string;
  title1: string;
  date1: string;
  categori1: string;

  img2: string;
  title2: string;
  date2: string;
  categori2: string;

  img3: string;
  title3: string;
  date3: string;
  categori3: string;

  img4: string;
  title4: string;
  date4: string;
  categori4: string;

  img5: string;
  title5: string;
  date5: string;
  categori5: string;
  Styles:string = "mainRow";

  goToDet(title){
    for(let i = 0 ; i < this.artWorkArr.length; i++){
      if(title == this.artWorkArr[i].Name){
        let id = this.artWorkArr[i].ID
        this.router.navigate(['/Artdetels', id]);
      }
    }
    this.rest.sendRout("artWorks")
  }
  constructor(public rest: RestService , private router: Router) { }
  ngOnInit() {
    this.subscription = this.rest.getObsData().subscribe((res) => {
      this.artWorkArr = res.ArtWorks
      if(res.state == "en"){
        this.headers = "art works"
        this.Styles = "mainRowEng"
      }else if(res.state == "ar"){
       this.headers = "اعمال فنية"
       this.Styles = "mainRow" 
      }else if(res.state == "fr"){
        this.headers = "oeuvres d'art"
       this.Styles = "mainRow"  
      }
      this.img = res.ArtWorks[0].image
      this.title = res.ArtWorks[0].Name
      this.date = res.ArtWorks[0].Date
      this.categori = res.ArtWorks[0].TypeName

      this.img1 = res.ArtWorks[1].image
      this.title1 = res.ArtWorks[1].Name
      this.date1 = res.ArtWorks[1].Date
      this.categori1 = res.ArtWorks[1].TypeName

      this.img2 = res.ArtWorks[2].image
      this.title2 = res.ArtWorks[2].Name
      this.date2 = res.ArtWorks[2].Date
      this.categori2 = res.ArtWorks[2].TypeName

      this.img3 = res.ArtWorks[3].image
      this.title3 = res.ArtWorks[3].Name
      this.date3 = res.ArtWorks[3].Date
      this.categori3 = res.ArtWorks[3].TypeName

      this.img4 = res.ArtWorks[4].image
      this.title4 = res.ArtWorks[4].Name
      this.date4 = res.ArtWorks[4].Date
      this.categori4 = res.ArtWorks[4].TypeName

      this.img5 = res.ArtWorks[5].image
      this.title5 = res.ArtWorks[5].Name
      this.date5 = res.ArtWorks[5].Date
      this.categori5 = res.ArtWorks[5].TypeName
    })
  }

}
