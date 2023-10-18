import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-resles-kenz-skafi',
  templateUrl: './resles-kenz-skafi.component.html',
  styleUrls: ['./resles-kenz-skafi.component.css']
})
export class ReslesKenzSkafiComponent implements OnInit {

  Lang = "1"
  count = '24'
  current = 1
  Arr = []
  showMasg = false
  showBookMasg = false

  query = ""
  contentShow = true
  Entites = []
  seirs = []
  latestsBooks = []
  filterList = []
  filterListEntits = []
  queryField: FormControl = new FormControl("");

  Styles: string = "headerh3";

  constructor(private rest : RestService , private router : Router) { }

ngOnInit() {

    
    this.queryField.valueChanges.subscribe((queryFieldValue: string) => {
      if (this.queryField.value == undefined) {
        this.getData()
        this.showBookMasg = false
        this.contentShow  = true
      }else if(this.queryField.value == ""){
        console.log(this.queryField.value)
        this.getData()
        this.showBookMasg = false
        this.contentShow  = true
      }else {
        this.query = queryFieldValue
        if(this.query.length > 1){
          this.rest.searchCultureBooks(this.Lang, queryFieldValue,this.count,this.current).subscribe((res: any) => {
            console.log(res)
            console.log(queryFieldValue)
            if (res.length == 0) {
              this.showBookMasg = true
              this.contentShow  = false
            } else {
              // for (let i = 0; i < res.length; i++) {
              //   res[i].Details = res[i].Details.split(" ").splice(0, 13).join(" ");
              // }
              this.latestsBooks = []
              this.Arr = res
              this.showBookMasg = false
              this.contentShow  = true
            }
          })
        }
      }
    })

  }

  getData() {
    this.latestsBooks = []
    this.rest.getCulturalTreasure(this.Lang, this.count, this.current).subscribe((res: any) => {
      console.log(res)
      
      for (let i = 0; i < res.Normal.length; i++) {
       // res.Normal[i].Details = res.Normal[i].Details.split(" ").splice(0, 13).join(" ");
      }
      for (let i = 0; i < 3 ; i++) {
       // res.Heighlited[i].Details = res.Heighlited[i].Details.split(" ").splice(0, 13).join(" ");
        this.latestsBooks.push(res.Heighlited[i])
      }

      if (res.length == 0) {
        this.showMasg = true
        this.contentShow  = false
      } else {
        this.Arr = res.Normal
        this.showMasg = false
        this.contentShow  = true
      }
    })
    this.rest.getEntits(this.Lang, this.count, this.current).subscribe((res : any) => {
      this.Entites = res.Entities
      this.seirs = res.Series
      console.log(res)
    })
  }

  CountUrl(id) {
    this.rest.getNumbersUrl(id).subscribe(res => {
      console.log(res)
    })
  }

  goToDet(id) {
    this.router.navigate(['/viddet', id]);
  }


  onCheckChange(e , id){
    console.log(e)
    console.log(id)

    if(e.target.checked == true){
      this.filterList.push(id)
    }else{
      const index = this.filterList.indexOf(id);
      this.filterList.splice(index, 1);
    }
  }

  onCheckEntitsChange(e , id){
    console.log(e)
    console.log(id)

    if(e.target.checked == true){
      this.filterListEntits.push(id)
    }else{
      const index = this.filterListEntits.indexOf(id);
      this.filterListEntits.splice(index, 1);
    }
  }


  saveList(){
    console.log(this.filterList)
    console.log(this.filterListEntits)
    this.rest.getDataAfterFilter(this.Lang, this.count, this.current,this.filterListEntits,this.filterList)
  }

  onScroll() {
    console.log(this.queryField.value)
    if(this.queryField.value == "" || this.queryField.value == undefined){
      this.current = this.current + 1
      console.log(this.current)
      this.rest.getCulturalTreasure(this.Lang, this.count, this.current).subscribe((res: any) => {
        let ArrayResp :any
        ArrayResp = res
        for (let i = 0; i < ArrayResp.Normal.length; i++) {
          ArrayResp.Normal[i].Details = ArrayResp.Normal[i].Details.split(" ").splice(0, 13).join(" ");
          this.Arr.push(ArrayResp.Normal[i])
        }
        console.log(res)
      })
    }

  }

}
