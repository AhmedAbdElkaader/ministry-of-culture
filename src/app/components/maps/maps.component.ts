import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  currentLanguageId

  lat = 30.044281;
  lng = 31.340002

  latitude = 30.044281;
  longitude = 31.340002

  zoom: number = 10;
  pointName
  markers :any
  arrayOfLngAndLat = []
  arrayOfEntity = []
  icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  showMap = true
  zoom2 = 10

  entityName;
  AddressEntity
  EmailEntity
  MobileEntity
  nameOfEvent
  DescriptionEntity
  webSiteEntity
  card2 = false
  showCardInfo = false
  constructor(
    public rest: RestService,
    private router: Router,
    public myLanguageService: MyLanguageServiceService
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }
  ngOnInit() {

    this.rest.setTitle("الخريطة - بوابة الثقافة");

    this.getData()
  }

  getData(){
    // this.rest.GetMapEventsCategory(this.currentLanguageId).subscribe((res:any) =>{
    // })
    this.rest.GetCultureMapActivities(this.currentLanguageId).subscribe((res : any) =>{
      console.log("this is activ",res)
      this.markers = res
      for(let i = 0 ; i < res.length; i++){
        for(let j = 0 ; j < res[i].Locations.length;j++){
          res[i].Locations[j].Name = res[i].Name
          this.arrayOfLngAndLat.push(res[i].Locations[j])
        }
      }
      console.log(this.arrayOfLngAndLat)
    })
    this.rest.GetCultureMapEntity(this.currentLanguageId).subscribe((res : any) =>{
      this.arrayOfEntity = res
      console.log("this.Entity" , res)
    })
  
  }

  zoomChange(event) {
    console.log(event)
    this.zoom = event
  }
  zoomChange2(event) {
    console.log(event)
    this.zoom2 = event
  }

  selectMarker(m){
    this.lat = m.lat
    this.lng = m.lng
    this.zoom = 17
    if(this.showMap == true){
      this.showCardInfo = true
      this.card2 = false
      this.nameOfEvent= m.Name
    }else{
      this.rest.GetCultureMapEntityById(this.currentLanguageId,m.ID).subscribe((res : any) =>{
        console.log("this is soarta " ,res)
        this.showCardInfo = false
        this.AddressEntity = res.Address
        this.EmailEntity = res.Email
        this.DescriptionEntity = res.Description
        this.entityName = res.Name
        this.MobileEntity = res.Mobile
        this.webSiteEntity = res.Site
        this.card2 = true

      })
    }

  }

  selectMarker2(m){
    this.showCardInfo = true
    this.nameOfEvent= m.Name
    this.latitude = m.Lat
    this.longitude = m.Lang
    this.zoom2 = 17
  }

  showEntityMap(){
    this.latitude = 30.044281;
    this.longitude = 31.340002
    this.zoom2 = 10
    this.showMap = false
  }
  showEventMap(){
    this.showMap = true
    this.zoom = 10
    this.lat = 30.044281;
    this.lng = 31.340002
  }

  close(){
    this.showCardInfo = false
    this.card2 = false
  }


}
