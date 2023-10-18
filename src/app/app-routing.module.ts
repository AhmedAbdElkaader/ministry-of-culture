import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { AworksComponent } from './pages/aworks/aworks.component';
import { AeventsComponent } from './pages/aevents/aevents.component';
import { ArelesesComponent } from './pages/areleses/areleses.component';
import { DetelisComponent } from './detelis/detelis.component';
import { ArtWorksDetComponent } from './detInfo/art-works-det/art-works-det.component';
import { EventsDetComponent } from './detInfo/events-det/events-det.component';
import { RelesDetComponent } from './detInfo/reles-det/reles-det.component';
import { CatgListComponent } from './components/catg-list/catg-list.component';
import { NewsCatgComponent } from './pages/news-catg/news-catg.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServForUserComponent } from './components/serv-for-user/serv-for-user.component';
import { ServDeteComponent } from './detInfo/serv-dete/serv-dete.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TickDetComponent } from './detInfo/tick-det/tick-det.component';
import { FairComponent } from './components/fair/fair.component';
import { FairApplyComponent } from './pages/fair-apply/fair-apply.component';
import { FairDetailsComponent } from './detInfo/fair-details/fair-details.component';
import { TraingComponent } from './pages/traing/traing.component';
import { TraingDetComponent } from './detInfo/traing-det/traing-det.component';
import { ChangeComponent } from './components/change/change.component';
import { LibraryComponent } from './pages/library/library.component';
import { MuseemComponent } from './pages/museem/museem.component';
import { CheackOutComponent } from './components/cheack-out/cheack-out.component';
import { BooskLibraryComponent } from './pages/boosk-library/boosk-library.component';
import { BooskLibraryDetComponent } from './pages/boosk-library-det/boosk-library-det.component';
import { MuseemDetComponent } from './detInfo/museem-det/museem-det.component';
import { DocumnetsComponent } from './pages/documnets/documnets.component';
import { MapsComponent } from './components/maps/maps.component';
import { LicenseComponent } from './pages/license/license.component';
import { ConferncesComponent } from './pages/confernces/confernces.component';
import { ConDetComponent } from './detInfo/con-det/con-det.component';
import { LicensedetComponent } from './detInfo/licensedet/licensedet.component';
import { DocmentDetComponent } from './detInfo/docment-det/docment-det.component';
import { ArtsCatgComponent } from './pages/arts-catg/arts-catg.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideosDetComponent } from './detInfo/videos-det/videos-det.component';
import { FeesCheckComponent } from './components/fees-check/fees-check.component';
import { AboutEntityComponent } from './pages/about-entity/about-entity.component';
import { TraingApplyComponent } from './pages/traing-apply/traing-apply.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { ReslesKenzSkafiComponent } from './pages/resles-kenz-skafi/resles-kenz-skafi.component';
import { MusumKenzSkafiComponent } from './pages/musum-kenz-skafi/musum-kenz-skafi.component';
import { MussemKenzSkaiDetComponent } from './detInfo/mussem-kenz-skai-det/mussem-kenz-skai-det.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'artWorks', component: AworksComponent },
  { path: 'evnets', component: AeventsComponent },
  { path: 'releses', component: ArelesesComponent },
  { path: 'map', component: MapsComponent },
  { path: 'servForUser', component: ServForUserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'changePass', component: ChangeComponent },
  { path: 'ticketServ', component: TicketsComponent },
  { path: 'libarary', component: LibraryComponent },
  { path: 'Museem', component: MuseemComponent },
  { path: 'Docment', component: DocumnetsComponent },
  { path: 'publication', component: PublicationsComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'confernces', component: ConferncesComponent },
  { path: 'FeesCheck', component: FeesCheckComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'Videosdet/:id', component: VideosDetComponent },
  { path: 'DocDet/:id', component: DocmentDetComponent },
  { path: 'MuseemDet/:id', component: MuseemDetComponent },
  { path: 'condet/:id', component: ConDetComponent },
  { path: 'licensedet/:id', component: LicensedetComponent },
  { path: 'cheackOut', component: CheackOutComponent },
  { path: 'bookLibrary/:id', component: BooskLibraryComponent },
  { path: 'bookLibraryDet/:id', component: BooskLibraryDetComponent },
  { path: 'detels/:id', component: DetelisComponent },
  { path: 'Artdetels/:id', component: ArtWorksDetComponent },
  { path: 'Eventsdetels/:id', component: EventsDetComponent },
  { path: 'Relessdetels/:id', component: RelesDetComponent },
  { path: 'CatList/:id', component: CatgListComponent },
  { path: 'newsCat/:id', component: NewsCatgComponent },
  { path: 'serveDet/:id', component: ServDeteComponent },
  { path: 'compDet/:id', component: CompetitionsComponent },
  { path: 'detTickets/:id', component: TickDetComponent },
  { path: 'fair', component: FairComponent },
  { path: 'traing', component: TraingComponent },
  { path: 'fairdet/:id', component: FairDetailsComponent },
  { path: 'traingDet/:id', component: TraingDetComponent },
  { path: 'fairapply/:id', component: FairApplyComponent },
  { path: 'artsCat/:id', component: ArtsCatgComponent },
  { path: 'aboutEntity/:id', component: AboutEntityComponent },
  { path: 'traingApply', component: TraingApplyComponent },
  { path: 'relesKensSkafi', component: ReslesKenzSkafiComponent },
  { path: 'musemKensSkafi', component: MusumKenzSkafiComponent },
  { path: 'Mussemdet/:id', component: MussemKenzSkaiDetComponent },
  { path: 'forgetPass', component: ForgetPassComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration : 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
