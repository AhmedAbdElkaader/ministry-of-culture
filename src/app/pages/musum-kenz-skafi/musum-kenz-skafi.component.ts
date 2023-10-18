import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-musum-kenz-skafi',
  templateUrl: './musum-kenz-skafi.component.html',
  styleUrls: ['./musum-kenz-skafi.component.css']
})
export class MusumKenzSkafiComponent implements OnInit {

  id = 0
  
  name =  "المعرض الافتراضي الفن بين ايديك"
  image =  "../../../assets/fnon.jpg"
  link = "https://artspaces.kunstmatrix.com/en/exhibition/3035751/%D8%A7%D9%84%D9%81%D9%86%D9%88%D9%86-%D9%85%D8%B5%D8%B1-%D8%A7%D9%84%D8%AC%D9%85%D9%8A%D9%84%D8%A9"

museem =[
  {
    name: "متحف الزعيم جمال عبدالناصر",
    image: "8016",
    port: "8016",
    id: "1"
  },
  {
    name: "متحف مصطفى كامل",
    image: "8017",
    port: "8017",
    id: "2"
  },
  {
    name: "متحف فن الزجاج والنحت والعجائن المصرية",
    image: "8018",
    port: "8018",
    id: "3"
  },
  {
    name: " معرض يوم المرأه العالمى 2020",
    image: "1",
    port: "8019",
    id: "4"
  },
  {
    name: "المعرض العام الدوره 41 لعام 2020",
    image: "2",
    port: "8020",
    id: "5"
  },
  {
    name: "صالون الشباب الدورة الثلاثون 2019",
    image: "3",
    port: "8021",
    id: "6"
  },
  {
    name: "( ذاكرة الشرق )  معرض كنوز متاحفنا الفنيه 4 ",
    image: "4",
    port: "8022",
    id: "7"
  },
  {
    name: "صالون النيل للتصوير الضوئى الدوره العاشره 2",
    image: "5",
    port: "8023",
    id: "8"
  },
  {
    name: "بينالى القاهدره الدولى لفنون الطفل",
    image: "6",
    port: "8024",
    id: "9"
  },
  {
    name: "معرض الفنان / احمد فؤاد سليم",
    image: "7",
    port: "8025",
    id: "10"
  },
  {
    name: " المهرجان السنوى الثانى عشر للحرف التقليديه والتراثيه 2019",
    image: "8",
    port: "8026",
    id: "11"
  },
  {
    name: "معرض / الصالون الرابع بعنوان 150 عام افتتاح قناة السويس شريان الخير",
    image: "8028",
    port: "8028",
    id: "12"
  },
  {
    name: "معرض / يابانى بعنوان ياكشيمية الارض",
    image: "8029",
    port: "8029",
    id: "13"
  },
  {
    name: "بينالى القاهره الدولى الثالث عشر",
    image: "8030",
    port: "8030",
    id: "14"
  },
  {
    name: "معرض الفنان / خالد حافظ",
    image: "8033",
    port: "8033",
    id: "15"
  },
  {
    name: "معرض الفنان / احمد شيحا",
    image: "8034",
    port: "8034",
    id: "16"
  },
  {
    name: " معرض الفنان / الرزاز ",
    image: "8035",
    port: "8035",
    id: "17"
  },
  {
    name: "(ملامح عهد)معرض كنوز متاحفنا 3 ",
    image: "8036",
    port: "8036",
    id: "18"
  },
  {
    name: "المعرض العام الدوره 40 لعام 2019",
    image: "8037",
    port: "8037",
    id: "19"
  },
  {
    name: " صالون الشباب الدوره التاسعه والعشرين لعام 2018",
    image: "8038",
    port: "8038",
    id: "20"
  },
  {
    name: "معرض الفنان / احمد عبد الوهاب",
    image: "8039",
    port: "8039",
    id: "21"
  },
  {
    name: "المهرجان السنوى الحادى عشر للحرف التقليديه والتراثيه 2018",
    image: "8040",
    port: "8040",
    id: "22"
  },
  {
    name: " صالون النحت الثانى 2018",
    image: "8041",
    port: "8041",
    id: "23"
  },
  {
    name: "الملتقى الدولى الخامس للكاريكاتير 2018",
    image: "8042",
    port: "8042",
    id: "24"
  },
  {
    name: "2 معرض / كنوز متاحفنا الفنيه",
    image: "8043",
    port: "8043",
    id: "25"
  },
  {
    name: " معرض الفنان / سمير فؤاد",
    image: "8044",
    port: "8044",
    id: "26"
  },
  {
    name: "معرض / الرسم التصويرى الصينى",
    image: "8045",
    port: "8045",
    id: "27"
  },
  {
    name: " معرض الفنان / إيهاب شاكر",
    image: "8046",
    port: "8046",
    id: "28"
  },
  {
    name: "صالون النيل للتصوير الضوئى الدوره التاسعه",
    image: "8047",
    port: "8047",
    id: "29"
  },
  {
    name: "صالون الشباب الدوره 28 لسنة 2017",
    image: "8048",
    port: "8048",
    id: "30"
  },
  {
    name: "المهرجان السنوى العاشر للحرف التقليديه والتراثيه سيناء...بطوله وفن وحياة 2017",
    image: "8049",
    port: "8049",
    id: "31"
  },
  {
    name: "معرض / ملتقى الفنون التطبيقيه الدولى الاول",
    image: "8050",
    port: "8050",
    id: "32"
  },
  {
    name: "المعرض العام الدوره التاسعه والثلاثون لعام 2017",
    image: "8051",
    port: "8051",
    id: "33"
  },
  {
    name: "معرض / ملتقى القاهره الدولى لفن الخط العربى الدوره الثالثه",
    image: "8052",
    port: "8052",
    id: "34"
  },
  {
    name: " ملتقى نور الشكل الدوره الثالثه",
    image: "8053",
    port: "8053",
    id: "35"
  },
  {
    name: "صالون ابيض واسود الدوره الرابعه 2017",
    image: "8054",
    port: "8054",
    id: "36"
  },
  {
    name: "معرض / كنوز متاحفنا الفنيه 1",
    image: "8055",
    port: "8055",
    id: "37"
  },
  {
    name: " معرض / الملتقى الدولى الرابع للكاريكاتير",
    image: "8056",
    port: "8056",
    id: "38"
  },
  {
    name: "معرض / صالون الفن الخاص 2017 الدوره السابعه",
    image: "8057",
    port: "8057",
    id: "39"
  },
  {
    name: "معرض الفنان / جمال السجينى",
    image: "8058",
    port: "8058",
    id: "40"
  },
  {
    name: " معرض الفنانه / نعيمه الشيشينى",
    image: "8059",
    port: "8059",
    id: "41"
  },
   {
    name: "معرض / ملتقى المصورين العرب الاول" ,
    image: "8060",
    port: "8060",
    id: "42"
  },
  {
    name: "متحف احمد شوقي",
    image: "8061",
    port: "8061",
    id: "43"
  },
  {
    name: "متحف الخزف الإسلامي",
    image: "8062",
    port: "8062",
    id: "44"
  },
  {
    name: "متحف الشمع",
    image: "8063",
    port: "8063",
    id: "45"
  },
  {
    name: "متحف الفن المصري الحديث",
    image: "8064",
    port: "8064",
    id: "46"
  },
  {
    name: "متحف الفن والحديقة ",
    image: "8065",
    port: "8065",
    id: "47"
  },
  {
    name: "متحف النصر للفن الحديث",
    image: "8066",
    port: "8066",
    id: "48"
  },
  {
    name: "متحف بيت الامه",
    image: "8067",
    port: "8067",
    id: "49"
  },
  {
    name: "متحف دنشواي القومي",
    image: "8068",
    port: "8068",
    id: "50"
  },

  {
    name: "متحف عفت نادي و سعد الخادم",
    image: "8070",
    port: "8070",
    id: "52"
  },
  {
    name: "متحف محمد محمود خليل و حرمه",
    image: "8071",
    port: "8071",
    id: "53"
  },
  {
    name: "متحف محمد ناجي",
    image: "8072",
    port: "8072",
    id: "54"
  },
  {
    name: "متحف محمود سعيد",
    image: "8073",
    port: "8073",
    id: "55"
  },
  {
    name: "متحف محمود مختار",
    image: "8074",
    port: "8074",
    id: "56"
  },
  {
    name: "متحف و مكتبه لفنون بالإسكندرية",
    image: "8075",
    port: "8075",
    id: "57"
  },
  {
    name: "مركز الفنون المعاصرة",
    image: "8076",
    port: "8076",
    id: "58"
  },

]

Lang = "1"

showMasg = false

Styles:string = "headerh3";

lang = '1'
count = '10'
current = 1
mussemArray;

  constructor(private rest : RestService, private router : Router) { }

  ngOnInit() {
    // this.getData()
    
  }
  
  getData(){
    this.rest.getMussum(this.lang,this.count,this.current).subscribe(res => {
      console.log(res)
      this.mussemArray = res
    })
  }


  goToDet(id) {
    this.router.navigate(['/Mussemdet', id]);
  }

}
