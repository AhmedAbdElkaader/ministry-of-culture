import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class RestService {


  public menu = null;

  private subject = new Subject<any>();
  private NewSubject = new Subject<any>();

  private anothrSubject = new Subject<any>();

  private subjectLang = new Subject<any>();

  private rout = new Subject<any>();
  private informationPerson = new Subject<any>();

  private profileInfoAll = new Subject<any>();

  EntityID;


  constructor(private http: HttpClient,
    private titleService: Title,
  ) { }

  //****  home Page  *****
  getEntityId(webName, langId) {
    return this.http.get(`${environment.baseUrl}/api/Home/GetEntityIdBySiteName/${langId}?webName=${webName}`)
  }
  getData(id, EntityID) {
    this.EntityID = EntityID
    return this.http.get(`${environment.baseUrl}/api/Home/GetFirstpart/${id}?EntityID=${EntityID}`)
  }
  getSecoundPart(id, EntityID) {
    this.EntityID = EntityID
    return this.http.get(`${environment.baseUrl}/api/Home/GetSeconedpart/${id}?EntityID=${EntityID}`)
  }
  // ***** end home Page ****


  // listing
  getNewsApi(count, CurrentPage, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/News/GetAllNews/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }
  getEventsApi(count, CurrentPage, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Event/GetAllEvent/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }
  getRelessApi(count, CurrentPage, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Release/GetAllRelease/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }
  getArtWorksApi(count, CurrentPage, langId) {
    const currentLangId = langId || this.checkLang();
    console.log(currentLangId)
    return this.http.get(
      `${environment.baseUrl}/api/ArtWorks/GetAllArtWorks/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`
    );
  }
  getFairApi(langId, count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Fairs/GetAllFairs/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }
  // end listing



  //* detils Api */

  getNewsdetils(Id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/News/GetNewsDetails/${currentLangId}/${Id}`)
  }
  getEventsDetils(Id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Event/GetEventDetails/${currentLangId}/${Id}`)
  }
  getArtWorksDetils(Id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/ArtWorks/GetArtWorksDetails/${currentLangId}/${Id}`)
  }
  getRelesDetils(Id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Release/GetReleaseDetails/${currentLangId}/${Id}`)
  }
  getFairDetails(id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Fairs/GetFairDetails/${langId}/${id}`)
  }

  // get by categ 
  getNewsByCatg(id, count, Current, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/News/GetAllNewsByCategory/${currentLangId}?CategoryId=${id}&Count=${count}&CurrentPage=${Current}&EntityID=${this.EntityID}`)
  }
  // end by categ


  getComById(count, Current, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Competitions/GetAllCompitionsById/${currentLangId}?Count=${count}&CurrentPage=${Current}&EntityID=${this.EntityID}`)
  }

  getComDetById(Id, langId, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Competitions/GetCompetitionDetails/${currentLangId}/${Id}`, { headers: headers })
  }

  // profil //

  registerApi(obj) {
   return this.http.post(`${environment.baseUrl}/api/Account/Register`, obj)
  }
  loginApi(obj) {
   return this.http.post(`${environment.baseUrl}/api/Account/LogIn`, obj)
  }

  forgetPassword(obj){
   return this.http.post(`${environment.baseUrl}/api/Account/ForgotPassword`, obj)
  }

  getProfilData(userId, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/GetIntellactaulData?UserID=${userId}`,
      { headers: headers })
  }

  updateInfo(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateIntellactaulData`, obj, { headers: headers }).subscribe(res => {
      console.log(res)
      this.sendInfo(res)
    })
  }

  editCover(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
   return this.http.post(`${environment.baseUrl}/api/Account/UpdateIntellactaulCover`, obj, { headers: headers })
  }
  editProfilPhoto(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/Account/UpdateIntellactaulImage`, obj, { headers: headers })
  }
  // prize
  postPrize(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/AddAwardsAndHonors`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  editPrize(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateAwardsAndHonors`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  deletPrize(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/DeleteAwardsAndHonors?ItemId=${id}`, { headers: headers })
  }
  //end Prize

  // Scholarship Info 
  postGrant(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/AddScholarships`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  editGrant(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateScholarships`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  deleteGrant(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/DeleteScholarships?ItemId=${id}`, { headers: headers })
  }
  //end Scholarship

  //start union
  postUni(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/AddUnionMemberships`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  editUni(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateUnionMemberships`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  deleteUni(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/DeleteUnionMemberships?ItemId=${id}`, { headers: headers })
  }
  // end union

  //start Association
  postChar(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/AddAssociationMemberships`, obj, { headers: headers }).subscribe(res => {
      console.log(res)
      this.sendProfilInfoAll(res)
    })
  }
  editChar(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateAssociationMemberships`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  deleteChar(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/DeleteAssociationMemberships?ItemId=${id}`, { headers: headers })
  }
  // end Association

  //start Edu

  postEdu(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/AddAcademicAndEducationalQualifications`, obj, { headers: headers }).subscribe(res => {
      console.log(res)
      this.sendProfilInfoAll(res)
    })
  }

  editEdu(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/Account/UpdateAcademicAndEducationalQualifications`, obj, { headers: headers }).subscribe(res => {
      this.sendProfilInfoAll(res)
      console.log(res)
    })
  }
  deleteEdu(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Account/DeleteAcademicAndEducationalQualifications?ItemId=${id}`, { headers: headers })
  }
  // end edu

  // end profile //

  
  getCompt(langId, id, accToken) {
    const currentLangId = langId || this.checkLang();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Competitions/GetCompetitionForm/${currentLangId}/${id}`,
      { headers: headers })
  }

  postCompt(obj, id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/Competitions/PostCompitionForm?compId=${id}`, obj, { headers: headers })
  }
  oldComptApply(compId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Competitions/GetApplication?compId=${compId}`,
    { headers: headers })
  }

  copmdetails(compId,AppId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Competitions/GetApplicationStatus?compId=${compId}&AppId=${AppId}`,
    { headers: headers })
  }
  // end copmt

  GetAllEventsWithTheatrs(langId, count, current) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Event/GetAllEventsWithTheatrs/${currentLangId}?Count=${count}&CurrentPage=${current}`)
  }

  getEventByTickets(id, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Event/GetEventWithTickitCountDetails/${currentLangId}/${id}`)
  }

  // planing traing
  GetAllPlaningTraining(langId, count, current) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/PlaningTraining/GetAllPlaningTraining/${currentLangId}?Count=${count}&CurrentPage=${current}`)
  }
  GetAllPlaningTrainingWithToken(langId, count, current,accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/PlaningTraining/GetAllPlaningTraining/${currentLangId}?Count=${count}&CurrentPage=${current}`, { headers: headers })
  }

  gettraingDet(id, langId,accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/PlaningTraining/GetPlaningTrainingDetails/${currentLangId}/${id}`, { headers: headers })
  }

  postTraing(id, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/PlaningTraining/PostTraningNeedRequest?plainingTrainingId=${id}`,"",{ headers: headers })
  }

  oldApplay(accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`http://api.cg.eg/Help/Api/GET-api-PlaningTraining-GetTraningStatus_planTrainingId`,
    { headers: headers })
  }

  statusOftraing(planTrainingId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/PlaningTraining/GetTraningStatus?planTrainingId=${planTrainingId}`,{ headers: headers })
  }

  PostTraningNeedRequest(plainingTrainingId , preRequestFile , accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/PlaningTraining/PostTraningNeedRequest?plainingTrainingId=${plainingTrainingId}&preRequestFile=${preRequestFile}`,"",{ headers: headers })
  }


  // end planing

  changePass(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/Account/ChangePassword`, obj, { headers: headers })
  }

  saveComment(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    obj.LangId = obj.LangId || this.checkLang();
    return this.http.post(`${environment.baseUrl}/api/News/AddNewComment`, obj, { headers: headers }).subscribe(res => {
      console.log(res)
    })
  }

  GetAllLibrary(langId, count, current) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Elibrary/GetAllElibraryEntities/${currentLangId}?Count=${count}&CurrentPage=${current}`)
  }

  GetAllLBooks(langId, EntityID) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Elibrary/GetAllElibraryByEntityID/${currentLangId}?EntityID=${EntityID}`)
  }

  getBookDet(langId, id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Elibrary/GetAllElibraryDetails/${currentLangId}/${id}`)
  }

  getBookSearch(Query) {
    return this.http.get(`${environment.baseUrl}/api/Elibrary/GetAllElibrarySearch?Query=${Query}`)
  }

  GetAllMuseums(langId, count, current) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Museums/GetAllMuseums/${currentLangId}?Count=${count}&CurrentPage=${current}&EntityID=${this.EntityID}`)
  }

  GetMuseumDet(langId, id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Museums/GetMuseumDetails/${currentLangId}/${id}`)
  }

  //publication
  GetPublicationForm(langId,accToken) {
    const currentLangId = langId || this.checkLang();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Publications/GetPublishingForm/${currentLangId}`, { headers: headers })
  }

  postPublicationForm(obj,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/Publications/PostPublishingForm`, obj, { headers: headers })
  }

  GetPublicationOld(accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Publications/GetApplication`, { headers: headers })
  }

  PublicationDetails(AppId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Publications/GetApplicationStatus?AppId=${AppId}`,
    { headers: headers })
  }

  // end publication

  //Docemnts 
  GetDocemnts(accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/DocumnetsRequests/GetAllDocumntsRequests`, { headers: headers })
  }

  postDocment(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    this.http.post(`${environment.baseUrl}/api/DocumnetsRequests/AddDocumntsRequests`, obj, { headers: headers }).subscribe(res => {
      console.log(res)
      this.sendInfo(res)
    })
  }
  getDocDet(accToken, ItemId) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/DocumnetsRequests/GetDocumntsRequestsDetails?ItemId=${ItemId}`, { headers: headers })
  }
  // end docment

  // maps 

  GetMapEventsCategory(langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulutureMap/GetEventsCategory/${currentLangId}`)
  }

  GetCultureMapActivities(langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulutureMap/CultureMapActivities/${currentLangId}`)
  }
  GetCultureMapEntity(langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulutureMap/GetCulutureMapEntities/${currentLangId}`)
  }
  GetCultureMapEntityById(langId, id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulutureMap/GetCulutureMapEntityDetails/${currentLangId}/${id}`)
  }

  // License
  getLicenseForm(Id, langId, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/ArtsLicenses/GetArtsLicensesTypeForm/${currentLangId}/${Id}`, { headers: headers })
  }
  setLicense(Id, obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/ArtsLicenses/PostArtsLicensesTypeForm?TypeId=${Id}`, obj, { headers: headers })
  }

  getArtLicenseApi(langId, Count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/ArtsLicenses/GetAllArtLicenceTypes/${currentLangId}?Count=${Count}&CurrentPage=${CurrentPage}`)
  }

  statusOflicnes(id,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${token}`);
    return this.http.get(`${environment.baseUrl}/api/ArtsLicenses/GetApplication?compId=${id}`,{ headers: headers }) 
  }

  licenceDetails(fairId,AppId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/ArtsLicenses/GetApplicationStatus?compId=${fairId}&AppId=${AppId}`,
    { headers: headers })
  }


  // end Art lic
  getConferncesApi(langId, count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Conferences/GetAllConference/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}`)
  }


  GetConferenceDetails(langId, Id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Conferences/GetConferenceDetails/${currentLangId}/${Id}`)
  }

  setConferenceHall(obj, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
   return this.http.post(`${environment.baseUrl}/api/Conferences/BookConferenceHall`, obj, { headers: headers })
  }

  //Art
  getArtCatg(langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/ArtWorks/GetArtWorksCategory/${currentLangId}`)
  }
  getArtByCatg(langId, catgId, count, currentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/ArtWorks/GetAllArtWorksByCategory/${currentLangId}?CategoryId=${catgId}&Count=${count}&CurrentPage=${currentPage}`)
  }
  //end Art

  //news
  getNewsCatg(langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/News/GetAllNewsCategory/${currentLangId}`)
  }

  getNewsBySearch(langId, query, Count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/News/GetAllNewsSearchResult/${currentLangId}?search=${query}&Count=${Count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }

  getEventsBySearch(langId, query, Count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    let govName = ""
    return this.http.get(`${environment.baseUrl}/api/Event/GetAllEventSearchResult/${currentLangId}?search=${query}&govName=${govName}&Count=${Count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }
  getReleseBySearch(langId, query, Count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Release/GetAllReleaseSearchResult/${currentLangId}?search=${query}&Count=${Count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }

// fair
  getFairForm(langId, id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/Fairs/GetFairForm/${currentLangId}/${id}`)
  }

  postFairForm(obj , id , accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.post(`${environment.baseUrl}/api/Fairs/PostFairForm?fairId=${id}`, obj, { headers: headers })
  }

  getOldFair(FairId, accToken) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Fairs/GetApplication?FairId=${FairId}`,{ headers: headers })
  }

  fairDetails(fairId,AppId,accToken){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `bearer ${accToken}`);
    return this.http.get(`${environment.baseUrl}/api/Fairs/GetApplicationStatus?fairId=${fairId}&AppId=${AppId}`,
    { headers: headers })
  }
// end fair




  //videos
  getVideos(count, CurrentPage, langId) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetAllVediosCulturalTreasure/${currentLangId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }

  searchCultureVideos(langId, Query, Count, CurrentPage) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetAllVediosSearchByTitle/${currentLangId}?Query=${Query}&Count=${Count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
  }

  getCulturalTreasureDet(langId, id) {
    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetCulturalTreasureDetails/${currentLangId}/${id}/?EntityID=${this.EntityID}`)
  }

  //setTitle
  setTitle(nameOfTilte) {
    return this.titleService.setTitle(nameOfTilte)
  }

  // payment

  payFess(obj) {
    let headers = new HttpHeaders();
    headers = headers.set('x-api-key', 'ohTs8M1g.qrJKGBL0cMABP7xhm8Qh4r9rEHdRJ10F');
    this.http.post('https://community.xpay.app/api/v1/payments/pay/variable-amount', obj, { headers: headers }).subscribe(res => {
      console.log('fess response is ', res)
      this.sendToken(res)
    })
  }

  checkFessIfPayed() {
    const uuid = localStorage.getItem('myUUID');
    let headers = new HttpHeaders();
    headers = headers.set('x-api-key', 'ohTs8M1g.qrJKGBL0cMABP7xhm8Qh4r9rEHdRJ10F');
    return this.http.get(`https://community.xpay.app/api/v1/communities/M2Q1r2Y/transactions/${uuid}/`, { headers: headers })
  }

  //About Entity 

  aboutEntity(langId, entityId, SubDetailTypeID) {

    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/AboutEntity/GetAllSubListDetailForEntity/${currentLangId}?EntityID=${entityId}&SubDetailTypeID=${SubDetailTypeID}`)
  }

  aboutSubEntity(langId, entityId, SubDetailTypeID) {

    const currentLangId = langId || this.checkLang();
    return this.http.get(`${environment.baseUrl}/api/AboutEntity/GetSubDetailForEntity/${currentLangId}?EntityID=${entityId}&SubDetailTypeID=${SubDetailTypeID}`)
  }

// search

searchResult(query) {
  return this.http.get(`${environment.baseUrl}/api/PortalSearch/SearchInSearchContentTable?Query=${query}`)
}

// kenz skafi asdrat 

searchCultureBooks(langId, Query ,Count ,CurrentPage) {
  return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetAllBooksSearchByTitle/${langId}?Query=${Query}&Count=${Count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
}

getCulturalTreasure(langId, count, CurrentPage) {
  return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetAllBookCulturalTreasure/${langId}?Count=${count}&CurrentPage=${CurrentPage}&EntityID=${this.EntityID}`)
}

getEntits(langId, count, CurrentPage) {
  return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/GetAllEntitiesSeriesCulturalTreasure/${langId}?Count=${count}&CurrentPage=${CurrentPage}`)
}

getNumbersUrl(ItemId) {
  return this.http.get(`${environment.baseUrl}/api/CulturalTreasure/IncreaseReadNumber?ItemId=${ItemId}`)
}

getDataAfterFilter(langId, count, CurrentPage, arrEnit, arrSer) {
  let obj = {
    EntitiesIds: arrEnit,
    SeriesIds: arrSer
  }
  return this.http.post(`${environment.baseUrl}/api/CulturalTreasure/GetAllCulturalTreasureByEntitiesorSeries/${langId}?Count=${count}&CurrentPage=${CurrentPage}`, obj).subscribe(res => {
    console.log(res)
  })
}

// end asdarat kenz skafi

  sendToken(events) {
    this.NewSubject.next(events)
  }
  getToken(): Observable<any> {
    return this.NewSubject.asObservable()
  }

  sendRout(events) {
    this.rout.next(events)
  }
  getRout(): Observable<any> {
    return this.rout.asObservable()
  }
// end esdarat kenz 

//musuem kenz skafi 

getMussum(langId,count, CurrentPage) {
  return this.http.get(`${environment.baseUrl}/api/Museums/GetAllMuseums/${langId}?Count=${count}&CurrentPage=${CurrentPage}`)
}


  sendInfo(events) {
    this.informationPerson.next(events)
  }
  getInfo(): Observable<any> {
    return this.informationPerson.asObservable()
  }

  sendProfilInfoAll(events) {
    this.profileInfoAll.next(events)
  }
  getProfilInfoAll(): Observable<any> {
    return this.profileInfoAll.asObservable()
  }




  sendObsData(event) {
    this.subject.next(event);
  }

  getObsData(): Observable<any> {
    return this.EntityID = this.subject.asObservable();
  }

  sendObservalData(event) {
    this.anothrSubject.next(event);
  }

  getObsrevalData(): Observable<any> {
    return this.anothrSubject.asObservable();
  }
  sendLogo(events) {
    this.subjectLang.next(events)
  }
  getLogo(): Observable<any> {
    return this.subjectLang.asObservable()
  }

  checkLang(): number {
    const value = sessionStorage.getItem('lang') || 'AR';
    switch (value) {
      case 'AR':
        return 1;
      case 'EN':
        return 2;
      case 'FR':
        return 3;
      default:
        return 1;
    }
  }


}
