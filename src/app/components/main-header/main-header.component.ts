import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl } from '@angular/forms';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {


  sliderImage = []
  faceBook: string;
  twitter: string;
  instgram: string;
  whenScroll: boolean = false
  signInWhenScroll: boolean = true
  selectedLang: string;
  langId: number;
  stats;
  signIn: string;
  menuList = [];
  serviceMenuList = []
  videosMenuList = []
  logoScroll: boolean = false
  nonScrollLogo: boolean = true
  statOFcolor = "active"
  languages: string[] = ['AR', 'EN', 'FR'];
  arrayOfNews = [];
  srcImage = "../../../assets/images/user.jpg"
  routofMenu;
  text: FormControl = new FormControl('.');
  redrawVersion = 0;
  whenLogin = false
  notLogin = false
  artCatg = []
  newsCatg = []
  eventList = new Array<string>();
  url
  EntityId
  showDivWhenEntityFaild = false
  imageLogo = "../../../assets/images/logo-dark.png"
  titleHeader = "بوابة الثقافة";
  aboutEntityArr ;
  serviceMenu = {
    hasCompitionsServicePermission: true,
    hasConferenceServicePermission: true,
    hasDocumntaionAppliesServicePermission: true,
    hasElibraryServicePermission: true,
    hasFairsServicePermission: true,
    hasMusemsServicePermission: true,
    hasPublicationServicePermission: true,
    hasTechnicalLicenseServicePermission: true,
    hasTheaterServicePermission: true,
    hasTrainingServicePermission: true
  };
  arabicMenuArr = [
    {
      name: "الخريطة",
      rout: "map",
      id: "1",
      isActive: false
    },
    {
      name: "عن الجهة",
      rout: "aboutEntity",
      id: "2",
      isActive: false

    },
    {
      name: "الخدمات",
      rout: "servForUser",
      id: "3",
      isActive: false

    },
    {
      name: "الكنز الثقافي",
      rout: "videos",
      id: "4",
      isActive: false

    },
    {
      name: "فعاليات",
      rout: "evnets",
      id: "6",
      isActive: false

    },
    {
      name: "اخبار",
      rout: "news",
      id: "8",
      isActive: false

    },
    {
      name: "الرئيسية",
      rout: "home",
      id: "9",
      isActive: true
    },
  ]
  //menu Eng
  englisMenuArr = [
    {
      name: "Home",
      rout: "home",
      id: "1",
      isActive: true
    },

    {
      name: "News",
      rout: "news",
      id: "3",
      isActive: false
    },
    {
      name: "Events",
      rout: "evnets",
      id: "4",
      isActive: false
    },
    {
      name: "cultural treasure",
      rout: "videos",
      id: "4",
      isActive: false

    },
    {
      name: "Services",
      rout: "servForUser",
      id: "3",
      isActive: false

    },
    {
      name: "About Entity",
      rout: "aboutEntity",
      id: "2",
      isActive: false

    },
    {
      name: "Map",
      rout: "map",
      id: "9",
      isActive: false
    },
  ]
  //frenshMenu
  frenchMenu = [
    {
      name: "Principale ",
      rout: "home",
      id: "1",
      isActive: true
    },

    {
      name: "Nouvelles",
      rout: "news",
      id: "3",
      isActive: false
    },
    {
      name: "événements",
      rout: "evnets",
      id: "4",
      isActive: false
    },
    {
      name: "trésor culturel",
      rout: "videos",
      id: "4",
      isActive: false

    },
    {
      name: "Prestations de service",
      rout: "servForUser",
      id: "3",
      isActive: false

    },
    {
      name: "À propos de l'entité",
      rout: "aboutEntity",
      id: "2",
      isActive: false

    },
    {
      name: "Carte",
      rout: "map",
      id: "9",
      isActive: false
    },
  ]

  arabicServiceMenu = [
    {
      name : "مسابقات",
      route : "servForUser"
    }
    ,
    {
      name : "خدمة النشر",
      route : "publication"
    }
    ,
    {
      name : "حجز تذاكر",
      route : "ticketServ"
    },
    {
      name : "المعارض",
      route : "fair"
    },
    {
      name : "التدريب و التاهيل",
      route : "traing"
    },
    {
      name : "الاطلاع علي الكتب",
      route : "libarary"
    },
    {
      name : "المتاحف",
      route : "Museem"
    },
    {
      name : "خدمه الوثائق",
      route : "Docment"
    },
    {
      name : "التراخيص الفنية",
      route : "license"
    },
    {
      name : "المؤتمرات",
      route : "confernces"
    }
  ]
  EnglishServiceMenu = [
    {
      name : "Competitions",
      route : "servForUser"
    }
    ,
    {
      name : "Publishing service",
      route : "publication"
    }
    ,
    {
      name : "Booking tickets",
      route : "ticketServ"
    },
    {
      name : "Fairs",
      route : "fair"
    },
    {
      name : "Training and qualification",
      route : "traing"
    },
    {
      name : "See books",
      route : "libarary"
    },
    {
      name : "Museums",
      route : "Museem"
    },
    {
      name : "Document service",
      route : "Docment"
    },
    {
      name : "Technical licenses",
      route : "license"
    },
    {
      name : "Conferences",
      route : "confernces"
    }
  ]
  arabicVideosMenu = [
    {
      name : "فيديوهات",
      route: "videos"
    },
    {
      name : "الاصدارات",
      route: "relesKensSkafi"
    },
    {
      name : "الجولات الافتراضية",
      route: "musemKensSkafi"
    }
  ]
  englishVideosMenu = [
    {
      name : "videos",
      route: "videos"
    },
    {
      name : "Releases",
      route: "relesKensSkafi"
    },
    {
      name : "Virtual Tours",
      route: "musemKensSkafi"
    }
  ]


  subscription: Subscription;


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if ((window.pageYOffset > element.clientHeight || window.pageYOffset > 5) && screen.width > 667) {
      element.classList.add('navbar-fixed-top');
      element.classList.add('navbarScroll');
      this.logoScroll = true
      this.nonScrollLogo = false
    } else {
      this.whenScroll = false
      element.classList.remove('navbar-fixed-top');
      element.classList.remove('navbarScroll');
      this.logoScroll = false
      this.nonScrollLogo = true
    }
  }

  constructor(
    private rest: RestService,
    private myLanguageService: MyLanguageServiceService,
    private router: Router,
    private SpinnerService: NgxSpinnerService
  ) {
    this.myLanguageService.languageSubject.next(1);
    this.ngOnInit()
  }

  ngOnInit() {


    this.SpinnerService.show();
     this.url =  window.location.hostname
    for(let i = 0 ; i < this.url.length ; i++){
      if(this.url[i] === '.'){
        this.url = this.url.slice(0,i)
        break
      }
    }
  
  
  
    // this.updateActiveRout()
    if (typeof this.langId == 'undefined') {
      this.langId = 1;
    }
    let item = localStorage.getItem('userName')
    if (item == null) {
      this.notLogin = true
      this.whenLogin = false
      this.srcImage = "../../../assets/images/user.jpg"
      this.rest.getToken().subscribe(res => {
        console.log(res)
        this.notLogin = false
        this.whenLogin = true

        localStorage.setItem('userName', res.UserName)
        localStorage.setItem('tokenData', res.TokenData.access_token)
        localStorage.setItem('userID', res.UserID)


        res.Image = null
        console.log("token")
        console.log(res)
        this.signIn = res.UserName;
        if (res.Image == null) {
          this.srcImage = "../../../assets/images/skafaLogo.png"
        } else {
          this.srcImage = res.UserImage
        }
      })
    } else {
      this.whenLogin = true
      this.signIn = item
      this.srcImage = "../../../assets/images/skafaLogo.png"
    }
    this.langId = this.rest.checkLang();
    this.selectedLang = sessionStorage.getItem('lang') || 'AR';
   
  //  this.getEntityId()
   this.EntityId = null
   this.getData();
    this.setLanguage(this.langId)
    this.getArtCatg();
    this.getNewsCatg();
  }

  goToBetaCg(){
     window.location.href = "http://beta.cg.eg/"
  }

  getEntityId(){
    console.log(this.url)
    if(this.url != "beta"){
      this.rest.getEntityId(this.url,this.langId).subscribe((res : any) => {
        console.log("iam entity",res)
        this.EntityId = res.ID 
        if(res.ID == 0){
          this.SpinnerService.hide();
          this.showDivWhenEntityFaild = true
          let elment: HTMLElement = document.getElementById('myModalForEntity') as HTMLElement
          elment.click()
        }else{
          this.titleHeader = res.Name
          this.showDivWhenEntityFaild = false
          this.getData();
        }
      })
    }else{
      if(this.langId == 1){
        this.titleHeader = "بوابة الثقافة";
      }else if(this.langId == 2){
        this.titleHeader = "Culture Gate"
      }
      this.EntityId = null
      this.showDivWhenEntityFaild = false
      this.getData();
    }
  }

  public selectChangeHandler(value: string) {
    sessionStorage.setItem('lang', value)
    this.langId = this.rest.checkLang();
    this.myLanguageService.languageSubject.next(this.langId);
    this.setLanguage(this.langId);
   this.getEntityId();
  //  this.getData();

  }

  public gotToRoutByCatg(routName,nameOfAboutEntity) {
    if(nameOfAboutEntity){
      localStorage.setItem("nameOfAboutEntity",nameOfAboutEntity)
    }
    this.rest.sendRout(routName)
    for (var i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].rout == routName) {
        this.menuList[i].isActive = true
        this.routofMenu = this.menuList[i].rout
        sessionStorage.setItem('nameOFrout', this.routofMenu)

      } else {
        this.menuList[i].isActive = false
      }
    }
  }

  public gotorout(rout) {

    this.rest.sendRout(rout)
    for (var i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].rout == rout) {
        this.menuList[i].isActive = true
        this.routofMenu = this.menuList[i].rout
        sessionStorage.setItem('nameOFrout', this.routofMenu)

      } else {
        this.menuList[i].isActive = false
      }
    }
    console.log(this.routofMenu)
    if (rout == "home") {
      this.router.navigateByUrl(`/${rout}`);
      this.getData()
      this.setLanguage(this.langId)
    } else {
      this.router.navigateByUrl(`/${rout}`);
    }
  }


  public gohome() {
    this.router.navigateByUrl(`/home`)
    this.getData()
    for (var i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].rout == 'home') {
        this.menuList[i].isActive = true
        this.routofMenu = this.menuList[i].rout
        sessionStorage.setItem('nameOFrout', this.routofMenu)

      } else {
        this.menuList[i].isActive = false
      }
    }
  }


  
  private getData() {

    this.rest.getData(this.langId,this.EntityId).subscribe((res: any) => {
      console.log(res)
      console.log(this.EntityId)
      localStorage.setItem("myEntityId",this.EntityId)
      res.state = this.stats
      // this.serviceMenu = res.EntitiesPermissions
      this.aboutEntityArr = res.AboutEntity.subListDetails
      for(let i = 0 ; i < res.AboutEntity.subDetails.length; i++){
        this.aboutEntityArr.push(res.AboutEntity.subDetails[i])
      }
      
      if(res.Logo != ""){
        this.imageLogo = res.Logo
        this.rest.sendLogo(res.Logo)
      }else{
        this.imageLogo = "../../../assets/images/logo-dark.png"
      }
      this.rest.sendObservalData(res)
      let elment: HTMLElement = document.getElementById('myModala') as HTMLElement
      elment.click()
      this.SpinnerService.hide();
    })

    this.rest.getSecoundPart(this.langId,this.EntityId).subscribe((res: any) => {
      console.log(res)
      res.state = this.stats
      let arr = res.LatestNews
      for (let i = 0; i < arr.length; i++) {
        this.arrayOfNews.push(arr[i].Name)
      }
      this.eventList = this.arrayOfNews
      this.rest.sendObsData(res)
      this.SpinnerService.hide();
    })
  }

  private setLanguage(lang: number) {
    let item = sessionStorage.getItem("nameOFrout")
    let item2 = localStorage.getItem('userName')
    if (item == null) {
      if (lang == 1) {
        this.rest.setTitle("بوابة الثقافة - بوابة الثقافة");
        this.langId = 1;
        this.stats = "ar"
        if (item2 == null) {
          this.signIn = "تسجيل الدخول"
        }
        this.menuList = this.arabicMenuArr
        this.serviceMenuList = this.arabicServiceMenu
        this.videosMenuList = this.arabicVideosMenu
      } else if (lang == 2) {
        this.rest.setTitle('Culture Gate - Culture Gate');
        this.langId = 2;
        this.stats = "en"
        if (item2 == null) {
          this.signIn = "Sign in"
        }
        this.menuList = this.englisMenuArr
        this.serviceMenuList = this.EnglishServiceMenu
        this.videosMenuList = this.englishVideosMenu
      } else if (lang == 3) {
        this.langId = 3;
        this.stats = "fr"
        if (item2 == null) {
          this.signIn = "se connecter"
        }
        this.menuList = this.frenchMenu
      }
    } else {
      if (lang == 1) {
        this.rest.setTitle("بوابة الثقافة - بوابة الثقافة")
        this.langId = 1;
        this.stats = "ar"
        if (item2 == null) {
          this.signIn = "تسجيل الدخول"
        }
        for (let i = 0; i < this.arabicMenuArr.length; i++) {
          if (item == this.arabicMenuArr[i].rout) {
            this.arabicMenuArr[i].isActive = true
          } else {
            this.arabicMenuArr[i].isActive = false
          }
        }
        this.menuList = this.arabicMenuArr
        this.serviceMenuList = this.arabicServiceMenu
        this.videosMenuList = this.arabicVideosMenu
      } else if (lang == 2) {
        this.rest.setTitle('Culture Gate - Culture Gate');
        this.langId = 2;
        this.stats = "en"
        if (item2 == null) {
          this.signIn = "Sign in"
        }
        for (let i = 0; i < this.englisMenuArr.length; i++) {
          if (item == this.englisMenuArr[i].rout) {
            this.englisMenuArr[i].isActive = true
          } else {
            this.englisMenuArr[i].isActive = false
          }
        }
        this.menuList = this.englisMenuArr
        this.serviceMenuList = this.EnglishServiceMenu
        this.videosMenuList = this.englishVideosMenu
      } else if (lang == 3) {
        this.langId = 3;
        this.stats = "fr"
        if (item2 == null) {
          this.signIn = "se connecter"
        }
        for (let i = 0; i < this.frenchMenu.length; i++) {
          if (item == this.frenchMenu[i].rout) {
            this.frenchMenu[i].isActive = true
          } else {
            this.frenchMenu[i].isActive = false
          }
        }
        this.menuList = this.frenchMenu
      }
    }
  }

  logOut() {
    localStorage.removeItem("userName");
    localStorage.removeItem("tokenData")
    localStorage.removeItem('userID')
    this.router.navigateByUrl(`home`)
    this.ngOnInit()
    //location.reload()
  }

  updateActiveRout() {
    this.rest.getRout().subscribe(res => {
      console.log(res)

      for (var i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].rout == res) {
          this.menuList[i].isActive = true
        } else {
          this.menuList[i].isActive = false
        }
      }
    })
  }

  goToCheakOut() {
    let token = localStorage.getItem('tokenData')
    if (token == null) {
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    } else {
      this.router.navigateByUrl(`/cheackOut`);
    }
  }

  getArtCatg() {
    this.rest.getArtCatg(this.langId).subscribe((res: any) => {
      this.artCatg = res
    })
  }

  getNewsCatg() {
    this.rest.getNewsCatg(this.langId).subscribe((res: any) => {
      this.newsCatg = res
    })
  }

search(){
  this.rest.searchResult('اخبار').subscribe(res => {
    console.log(res)
  })
}

}
