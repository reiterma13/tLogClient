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
    LoginPage,
    RegisterPage,
    AddTripPage,
    TripPage,
    AddPoiPage,
    ShowPoiPage,
    AddImagePage,
    PoiListPage
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
    PoiListPage
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
