import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TripRatingDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trip-rating-detail',
  templateUrl: 'trip-rating-detail.html'
})
export class TripRatingDetailPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TripRatingDetailPage Page');
  }

}
