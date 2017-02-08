import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {Security} from "../providers/security";
import {LoginPage} from "../pages/login/login";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterPage} from "../pages/register/register";
import {Storage} from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import {Serverconfig} from "../providers/serverconfig";
import {Tlog} from "../providers/tlog";
import {AddTripPage} from "../pages/add-trip/add-trip";
import {TripPage} from "../pages/trip/trip";
import {AddPoiPage} from "../pages/add-poi/add-poi";
import {ShowPoiPage} from "../pages/show-poi/show-poi";
import {AddImagePage} from "../pages/add-image/add-image";
import {PoiListPage} from "../pages/poi-list/poi-list";
import {ListLikedTripsPage} from '../pages/list-liked-trips/list-liked-trips';
import {RateTripPage} from "../pages/rate-trip/rate-trip";
import {WantToVisitPage} from "../pages/want-to-visit/want-to-visit";
import {ListLikedPoisPage} from "../pages/list-liked-pois/list-liked-pois";
import {ListRatedTripsPage} from "../pages/list-rated-trips/list-rated-trips";
import {ListRatedPoisPage} from "../pages/list-rated-pois/list-rated-pois";
import {RatePoiPage} from "../pages/rate-poi/rate-poi";
import {WantToMakeTripPage} from "../pages/want-to-make-trip/want-to-make-trip";
import {TripRatingDetailPage} from "../pages/trip-rating-detail/trip-rating-detail";
import {PoiRatingDetailPage} from "../pages/poi-rating-detail/poi-rating-detail";
import {POIRadiusPage} from "../pages/poi-radius-page/poi-radius-page";
import {BestRatedTripsPage} from "../pages/best-rated-trips/best-rated-trips";
import {BestRatedPoisPage} from "../pages/best-rated-pois/best-rated-pois";


let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: '',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ListLikedTripsPage,
    RateTripPage,
    WantToVisitPage,
    LoginPage,
    RegisterPage,
    AddTripPage,
    TripPage,
    AddPoiPage,
    ShowPoiPage,
    AddImagePage,
    PoiListPage,
    WantToVisitPage,
    ListLikedPoisPage,
    ListRatedPoisPage,
    ListRatedTripsPage,
    RatePoiPage,
    WantToMakeTripPage,
    TripRatingDetailPage,
    PoiRatingDetailPage,
    POIRadiusPage,
    BestRatedTripsPage,
    BestRatedPoisPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    AddTripPage,
    TripPage,
    AddPoiPage,
    ShowPoiPage,
    AddImagePage,
    PoiListPage,
    WantToVisitPage,
    ListLikedTripsPage,
    ListLikedPoisPage,
    RateTripPage,
    ListRatedTripsPage,
    ListRatedPoisPage,
    RatePoiPage,
    WantToMakeTripPage,
    TripRatingDetailPage,
    PoiRatingDetailPage,
    POIRadiusPage,
    BestRatedTripsPage,
    BestRatedPoisPage
  ],
  providers: [Security,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    Serverconfig,
    Tlog
  ]
})
export class AppModule {}
