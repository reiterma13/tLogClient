import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {PoiListPage} from "../pages/poi-list/poi-list";

import { WantToVisitPage } from "../pages/want-to-visit/want-to-visit";
import { ListLikedTripsPage } from '../pages/list-liked-trips/list-liked-trips';
import {ListLikedPoisPage} from "../pages/list-liked-pois/list-liked-pois";
import {ListRatedTripsPage} from "../pages/list-rated-trips/list-rated-trips";
import {ListRatedPoisPage} from "../pages/list-rated-pois/list-rated-pois";
import {WantToMakeTripPage} from "../pages/want-to-make-trip/want-to-make-trip";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Trips', component: ListPage },
      { title: 'POIs', component: PoiListPage },
      { title: 'POIs I want to visit', component: WantToVisitPage },
      { title: 'Trips I want to make', component: WantToMakeTripPage },
      { title: 'Liked Trips', component: ListLikedTripsPage },
      { title: 'Liked POIs', component: ListLikedPoisPage },
      { title: 'Rated Trips', component: ListRatedTripsPage },
      { title: 'Rated POIs', component: ListRatedPoisPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
