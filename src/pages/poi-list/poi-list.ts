import { Component } from '@angular/core';

import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {Security} from '../../providers/security';
import {LoginPage} from "../login/login";
import {Tlog} from "../../providers/tlog";
import {ShowPoiPage} from "../show-poi/show-poi";
import {POI} from "../../models/models";
import {AddTripPage} from "../add-trip/add-trip";


@Component({
  templateUrl: 'poi-list.html'
})
export class PoiListPage {
  selectedItem: any;
  icons: string[];
  items: Array<POI>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [];

  }

  addTrip = () => this.navCtrl.push(AddTripPage)

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  loadAllPOIs = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching all POIs"
    });
    loading.present()
      .then(this.tLogService.getAllPOIs)
      .then(pois => this.items = pois).then(() => {
      loading.dismiss();
      if (this.items.length === 0) {
        this.showAlert("INFO", "There are no POIs yet. Press the Plus Icon to create one.")
      }
    })
      .catch(err => {
        loading.dismiss();
        this.showAlert("Error", `Could not retrieve list of POIs: ${err.message || err}`);
      });
  }

  loadMyPOIs = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching your POIs"
    });
    loading.present()
      .then(this.tLogService.getMyPOIs)
      .then(pois => this.items = pois).then(() => {
      loading.dismiss();
      if (this.items.length === 0) {
        this.showAlert("INFO", "You do not have any POIs yet. Press the Plus Icon to create one.")
      }
    })
      .catch(err => {
        loading.dismiss();
        this.showAlert("Error", `Could not retrieve list of POIs: ${err.message || err}`);
      });
  }

  ionViewWillEnter = () => {
    this.security.isNotloggedIn().then(exp => {
      if (exp) this.navCtrl.setRoot(LoginPage); else this.loadMyPOIs()
    });
  }


  itemTapped(event, poi) {
    console.log(poi);
    this.navCtrl.push(ShowPoiPage, {
      poi: poi
    });
  }
}
