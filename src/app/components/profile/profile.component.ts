import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileImage = "https://via.placeholder.com/100"
  coverImage
  sytle1 = true
  about = []
  aboutForm: FormGroup

  charites = []
  charForm: FormGroup

  union = []
  unionForm: FormGroup

  education = []
  eduForm: FormGroup

  grant = []
  grantForm: FormGroup

  prize = []
  prizeForm: FormGroup

  profileInfo = [];
  private base64textString;
  userName

  constructor(public rest: RestService) { }

  ngOnInit() {

    let token = localStorage.getItem("tokenData")
    let userId = localStorage.getItem("userID")

    this.rest.getProfilData(userId, token).subscribe((res: any) => {
      console.log(res)
      this.charites = res.AssociationMemberships
      this.union = res.UnionMemberships
      this.education = res.AcademicAndEducationalQualifications
      this.grant = res.Scholarships
      this.prize = res.AwardsAndHonors
      if(res.MainData.cover){
        this.sytle1 = false
      }
      this.profileImage = res.MainData.Image
      this.coverImage = res.MainData.cover
      this.userName = res.MainData.NameAr
      this.profileInfo.push(res.MainData)
    })
    this.rest.getInfo().subscribe(res => {
      this.profileInfo = []
      this.profileInfo.push(res)
    })
    this.rest.getProfilInfoAll().subscribe(res => {
      this.charites = res
    })


    this.aboutForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Nick: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      BirthDate: new FormControl('', Validators.required),
      BirthLocation: new FormControl('', Validators.required),
      NationalID: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Phone: new FormControl('', Validators.required),
      Mobile: new FormControl('', Validators.required),
      Fax: new FormControl('', Validators.required),
      Website: new FormControl('', Validators.required),
      Intersted: new FormControl('', Validators.required),
      OtherData: new FormControl('', Validators.required),
      Id: new FormControl(''),
    })

    this.charForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Role: new FormControl('', Validators.required),
      Responsibilities: new FormControl('', Validators.required),
      Year: new FormControl('', Validators.required),
      Id: new FormControl(''),
    })

    this.unionForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Division: new FormControl('', Validators.required),
      Side: new FormControl('', Validators.required),
      Year: new FormControl('', Validators.required),
      Id: new FormControl(''),
    })

    this.eduForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      Side: new FormControl('', Validators.required),
      Year: new FormControl('', Validators.required),
      Id: new FormControl(''),
    })

    this.grantForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Side: new FormControl('', Validators.required),
      YearFrom: new FormControl('', Validators.required),
      YearTo: new FormControl('', Validators.required),
      Id: new FormControl(''),
    })

    this.prizeForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Year: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Id: new FormControl(''),

    })

  }

  styleObject(): Object {
    if (this.sytle1 == false){
        return {
          'background':'url('+ this.coverImage +')',
          'background-position': '100% 100%',
          'background-repeat':'no-repeat',
          'background-size':'cover'
        }
    }
    return {}
}

  nameOfimage
  handleFileSelect(evt, name) {
    this.nameOfimage = name
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
    //  this.editCover()
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log("this.base 64", btoa(binaryString));
    let tokenData = localStorage.getItem("tokenData")
    let obj = {
      Image: this.base64textString
    }
    console.log(obj)
    if (this.nameOfimage == "cover") {

      this.rest.editCover(obj, tokenData).subscribe((res: any) => {
        console.log(res)
        this.sytle1 = false
        this.coverImage = res.Image
        this.styleObject()
      })
    } else {
      this.rest.editProfilPhoto(obj, tokenData).subscribe((res: any) => {
        console.log(res)
        this.profileImage = res.Image
      })
    }

  }



  // Person Data Info
  PerId;
  PerName = ""
  PerNick = ""
  PerEmail = ""
  PerBirthDate = ""
  PerBirthLocation = ""
  PerNationalID = ""
  PerAddress = ""
  PerPhone = ""
  PerMobile = ""
  PerFax = ""
  PerWebsite = ""
  PerIntersted = ""
  PerOtherData = ""
  PerFormValue
  PerIndex: any

  updatePer() {
    this.PerId = this.profileInfo[0].Id
    this.PerName = this.profileInfo[0].NameAr
    this.PerNick = this.profileInfo[0].NickNameAr
    this.PerEmail = this.profileInfo[0].NickNameAr
    this.PerBirthDate = this.profileInfo[0].BirthDate
    this.PerBirthLocation = this.profileInfo[0].BirthLocation
    this.PerNationalID = this.profileInfo[0].NationalID
    this.PerAddress = this.profileInfo[0].Address
    this.PerPhone = this.profileInfo[0].Phone
    this.PerMobile = this.profileInfo[0].Mobile
    this.PerFax = this.profileInfo[0].Fax
    this.PerWebsite = this.profileInfo[0].Website
    this.PerIntersted = this.profileInfo[0].Intersted
    this.PerOtherData = this.profileInfo[0].OtherData
  }
  saveInfo() {
    let tokenData = localStorage.getItem("tokenData")
    let obj = this.profileInfo[0]
    obj.NameAr = this.PerName
    obj.NickNameAr = this.PerNick
    obj.Email = this.PerEmail
    obj.BirthDate = this.PerBirthDate
    obj.BirthLocation = this.PerBirthLocation
    obj.NationalID = this.PerNationalID
    obj.Address = this.PerAddress
    obj.Phone = this.PerPhone
    obj.Mobile = this.PerMobile
    obj.Fax = this.PerFax
    obj.Website = this.PerWebsite

    this.rest.updateInfo(obj, tokenData)
    console.log(obj)
  }
  // end Person Info




  // Association Info
  charId = ""
  charName = ""
  charRole = ""
  charResponsibilities = ""
  charYear = ""
  charFormValue
  charIndex: any

  addChar() {
    let tokenData = localStorage.getItem("tokenData")
    let cObj = this.charForm.value
    console.log(cObj)
    this.rest.postChar(cObj, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.charites = res
    })
    this.charForm.reset();
  }
  updateChar(obj: any) {
    this.charName = ""
    this.charRole = ""
    this.charResponsibilities = ""
    this.charYear = ""
    this.charFormValue
    this.charFormValue = obj
    this.charName = obj.Name
    this.charRole = obj.Role
    this.charResponsibilities = obj.Responsibilities
    this.charYear = obj.Year
  }
  editChar() {
    let tokenData = localStorage.getItem("tokenData")
    this.charFormValue.Name = this.charName
    this.charFormValue.Role = this.charRole
    this.charFormValue.Responsibilities = this.charResponsibilities
    this.charFormValue.Year = this.charYear
    console.log(this.charFormValue)
    this.rest.editChar(this.charFormValue, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.charites = res
    })
  }
  afterCharDelete(id, index) {
    this.charIndex = index
    this.charId = id
  }
  deleteChar() {
    let tokenData = localStorage.getItem("tokenData")
    this.rest.deleteChar(this.charId, tokenData).subscribe((res: any) => {
      this.charites = res
    })
  }

  // union Info
  uniId = ""
  uniName = ""
  uniDivision = ""
  uniSide = ""
  uniYear = ""
  uniFormValue
  uniIndex: any

  addUni() {
    let tokenData = localStorage.getItem("tokenData")
    let uObj = this.unionForm.value
    console.log(uObj)
    this.rest.postUni(uObj, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.union = res
    })
    this.unionForm.reset();
  }
  updateUni(obj: any) {
    this.uniName = ""
    this.uniDivision = ""
    this.uniSide = ""
    this.uniYear = ""
    this.uniFormValue
    this.uniFormValue = obj
    this.uniName = obj.Name
    this.uniDivision = obj.Division
    this.uniSide = obj.Side
    this.uniYear = obj.Year
  }
  editUni() {
    let tokenData = localStorage.getItem("tokenData")
    this.uniFormValue.Name = this.uniName
    this.uniFormValue.Division = this.uniDivision
    this.uniFormValue.Side = this.uniSide
    this.uniFormValue.Year = this.uniYear
    this.rest.editUni(this.uniFormValue, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.union = res
    })
  }
  afterUniDelete(id, index) {
    this.uniIndex = index
    this.uniId = id
  }
  deleteUni() {
    let tokenData = localStorage.getItem("tokenData")
    this.rest.deleteUni(this.uniId, tokenData).subscribe((res: any) => {
      this.union = res
    })

  }


  // education Info
  eduId
  eduName = ""
  eduType = ""
  eduSide = ""
  eduYear = ""
  eduFormValue
  eduIndex: any

  addEdu() {
    let tokenData = localStorage.getItem("tokenData")
    let eObj = this.eduForm.value
    console.log(eObj)
    this.rest.postEdu(eObj, tokenData)
    this.rest.getProfilInfoAll().subscribe((res) => {
      this.education = res
    })
    this.eduForm.reset();
  }
  updateEdu(obj: any) {
    this.eduName = ""
    this.eduType = ""
    this.eduSide = ""
    this.eduYear = ""
    this.eduFormValue
    this.eduFormValue = obj
    this.eduName = obj.Name
    this.eduType = obj.Type
    this.eduSide = obj.Side
    this.eduYear = obj.Year
  }
  editEdu() {
    let tokenData = localStorage.getItem("tokenData")
    this.eduFormValue.Name = this.eduName
    this.eduFormValue.Type = this.eduType
    this.eduFormValue.Side = this.eduSide
    this.eduFormValue.Year = this.eduYear
    this.rest.editEdu(this.eduFormValue, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.education = res
    })
  }
  afterEduDelete(id) {
    console.log(id)
    this.eduId = id
  }
  deleteEdu() {
    let tokenData = localStorage.getItem("tokenData")
    this.rest.deleteEdu(this.eduId, tokenData).subscribe((res: any) => {
      this.education = res
    })
  }




  // Scholarship Info
  schId
  schName = ""
  schSide = ""
  schYearFrom = ""
  schYearTo = ""
  schFormValue
  schIndex: any

  addGrant() {
    let tokenData = localStorage.getItem("tokenData")
    let gObj = this.grantForm.value
    console.log(gObj)
    this.rest.postGrant(gObj, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.grant = res
    })
    this.grantForm.reset();
  }
  updateGrant(obj: any) {
    this.schName = ""
    this.schSide = ""
    this.schYearFrom = ""
    this.schYearTo = ""
    this.schFormValue
    this.schFormValue = obj
    this.schName = obj.Name
    this.schSide = obj.Side
    this.schYearFrom = obj.YearFrom
    this.schYearTo = obj.YearTo
  }
  editGrant() {
    let tokenData = localStorage.getItem("tokenData")
    this.schFormValue.Name = this.schName
    this.schFormValue.Side = this.schSide
    this.schFormValue.YearFrom = this.schYearFrom
    this.schFormValue.YearTo = this.schYearTo
    this.rest.editGrant(this.schFormValue, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.grant = res
    })
  }
  afterSchDelete(id, index) {
    this.schIndex = index
    this.schId = id
  }
  deleteGrant() {
    let tokenData = localStorage.getItem("tokenData")
    this.rest.deleteGrant(this.schId, tokenData).subscribe((res: any) => {
      this.grant = res
    })
  }


  // Prize Info
  Name = ""
  Year = ""
  Description = ""
  Id = ""
  index: any
  formValue
  delete_prize: string;

  addPrize() {
    let tokenData = localStorage.getItem("tokenData")
    let pObj = this.prizeForm.value
    console.log(pObj)
    this.rest.postPrize(pObj, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.prize = res
    })
    this.prizeForm.reset();
  }
  update(obj: any) {
    this.Name = ""
    this.Year = ""
    this.Description = ""
    this.formValue
    this.formValue = obj
    this.Name = obj.Name
    this.Year = obj.Year
    this.Description = obj.Description
  }
  editPrize() {
    let tokenData = localStorage.getItem("tokenData")
    this.formValue.Name = this.Name
    this.formValue.Year = this.Year
    this.formValue.Description = this.Description
    this.rest.editPrize(this.formValue, tokenData)
    this.rest.getProfilInfoAll().subscribe(res => {
      this.prize = res
    })
  }
  afterDelet(id, index) {
    this.index = index
    this.Id = id
  }
  deletePrize() {
    let tokenData = localStorage.getItem("tokenData")
    this.rest.deletPrize(this.Id, tokenData).subscribe((res: any) => {
      this.prize = res
    })
  }
  // end Prize

}
