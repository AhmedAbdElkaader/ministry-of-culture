import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TopTopicsComponent } from './components/top-topics/top-topics.component';
import { RecentEventsComponent } from './components/recent-events/recent-events.component';
import { BooksComponent } from './components/books/books.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsMinsistryComponent } from './components/news-minsistry/news-minsistry.component';
import { AppsComponent } from './components/apps/apps.component';
import { SocialMediaImageComponent } from './components/social-media-image/social-media-image.component';
import { ArtWorksComponent } from './components/art-works/art-works.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInOutComponent } from './components/sign-in-out/sign-in-out.component';
import { HttpClientModule } from '@angular/common/http';
import { AworksComponent } from './pages/aworks/aworks.component';
import { ArelesesComponent } from './pages/areleses/areleses.component';
import { AeventsComponent } from './pages/aevents/aevents.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetelisComponent } from './detelis/detelis.component';
import { ArtWorksDetComponent } from './detInfo/art-works-det/art-works-det.component';
import { EventsDetComponent } from './detInfo/events-det/events-det.component';
import { RelesDetComponent } from './detInfo/reles-det/reles-det.component';
import { SliderComponent } from './components/slider/slider.component';
import { CatgListComponent } from './components/catg-list/catg-list.component';
import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { TickerDirective } from './ticker/ticker.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsCatgComponent } from './pages/news-catg/news-catg.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServForUserComponent } from './components/serv-for-user/serv-for-user.component';
import { ServDeteComponent } from './detInfo/serv-dete/serv-dete.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TickDetComponent } from './detInfo/tick-det/tick-det.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { FairComponent } from './components/fair/fair.component';
import { FairDetailsComponent } from './detInfo/fair-details/fair-details.component';
import { FairApplyComponent } from './pages/fair-apply/fair-apply.component';
import { TraingComponent } from './pages/traing/traing.component';
import { TraingDetComponent } from './detInfo/traing-det/traing-det.component';
import { ChangeComponent } from './components/change/change.component';
import { MapsComponent } from './components/maps/maps.component';
import { LibraryComponent } from './pages/library/library.component';
import { MuseemComponent } from './pages/museem/museem.component';
import { CheackOutComponent } from './components/cheack-out/cheack-out.component';
import { BooskLibraryComponent } from './pages/boosk-library/boosk-library.component';
import { BooskLibraryDetComponent } from './pages/boosk-library-det/boosk-library-det.component';
import { MuseemDetComponent } from './detInfo/museem-det/museem-det.component';
import { DocumnetsComponent } from './pages/documnets/documnets.component';
import { AgmCoreModule } from '@agm/core';
import { ConferncesComponent } from './pages/confernces/confernces.component';
import { LicenseComponent } from './pages/license/license.component';
import { LicensedetComponent } from './detInfo/licensedet/licensedet.component';
import { ConDetComponent } from './detInfo/con-det/con-det.component';
import { DocmentDetComponent } from './detInfo/docment-det/docment-det.component';
import { ArtsCatgComponent } from './pages/arts-catg/arts-catg.component';
import { NgwWowModule } from 'ngx-wow';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CarReviewComponent } from './components/car-review/car-review.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideosDetComponent } from './detInfo/videos-det/videos-det.component';
import { FeesCheckComponent } from './components/fees-check/fees-check.component';
import { OwlModule } from 'ngx-owl-carousel';
import { AboutEntityComponent } from './pages/about-entity/about-entity.component';
import { TraingApplyComponent } from './pages/traing-apply/traing-apply.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { ReslesKenzSkafiComponent } from './pages/resles-kenz-skafi/resles-kenz-skafi.component';
import { MusumKenzSkafiComponent } from './pages/musum-kenz-skafi/musum-kenz-skafi.component';
import { MussemKenzSkaiDetComponent } from './detInfo/mussem-kenz-skai-det/mussem-kenz-skai-det.component';  
import { DatePipe } from '@angular/common';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    TopTopicsComponent,
    RecentEventsComponent,
    BooksComponent,
    MainHeaderComponent,
    HomeComponent,
    NewsComponent,
    NewsMinsistryComponent,
    AppsComponent,
    SocialMediaImageComponent,
    ArtWorksComponent,
    FooterComponent,
    SignInOutComponent,
    AworksComponent,
    ArelesesComponent,
    AeventsComponent,
    DetelisComponent,
    ArtWorksDetComponent,
    EventsDetComponent,
    RelesDetComponent,
    SliderComponent,
    CatgListComponent,
    TickerDirective,
    NewsCatgComponent,
    ProfileComponent,
    ServForUserComponent,
    ServDeteComponent,
    CompetitionsComponent,
    TicketsComponent,
    TickDetComponent,
    FairComponent,
    FairDetailsComponent,
    FairApplyComponent,
    TraingComponent,
    TraingDetComponent,
    ChangeComponent,
    MapsComponent,
    LibraryComponent,
    MuseemComponent,
    CheackOutComponent,
    BooskLibraryComponent,
    BooskLibraryDetComponent,
    MuseemDetComponent,
    DocumnetsComponent,
    ConferncesComponent,
    LicenseComponent,
    LicensedetComponent,
    ConDetComponent,
    DocmentDetComponent,
    ArtsCatgComponent,
    CarReviewComponent,
    VideosComponent,
    VideosDetComponent,
    FeesCheckComponent,
    AboutEntityComponent,
    TraingApplyComponent,
    PublicationsComponent,
    ReslesKenzSkafiComponent,
    MusumKenzSkafiComponent,
    MussemKenzSkaiDetComponent,
    ForgetPassComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxNewstickerAlbeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    InfiniteScrollModule,
    NgwWowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCyMTkJPF1h8eAQi8NVA61UUCge7XHiXfE'
    }),
    OwlModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
