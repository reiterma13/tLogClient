import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PoiRatingDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-poi-rating-detail',
  templateUrl: 'poi-rating-detail.html'
})
export class PoiRatingDetailPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PoiRatingDetailPage Page');
  }

}
