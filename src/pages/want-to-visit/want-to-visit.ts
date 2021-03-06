import { Component } from '@angular/core';

import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {Security} from '../../providers/security';
import {LoginPage} from "../login/login";
import {Tlog} from "../../providers/tlog";
import {ShowPoiPage} from "../show-poi/show-poi";
import {POI} from "../../models/models";
import {AddTripPage} from "../add-trip/add-trip";


/*
  Generated class for the WantToVisit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-want-to-visit',
  templateUrl: 'want-to-visit.html'
})
export class WantToVisitPage {
  selectedItem: any;
  icons: string[];
  items: Array<POI>;
  searchItems: Array<POI>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [];
    this.searchItems = [];

  }

  initSearchItems = () => this.searchItems = this.items;

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initSearchItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchItems = this.searchItems.filter((items) => {
        return (items.name.toLowerCase().indexOf(val.toLocaleLowerCase()) > -1);
      })
    }
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
      this.initSearchItems()
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
      this.initSearchItems()
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

  private loggedIn:boolean = false;
  ionViewWillEnter = () => {

    this.security.getToken().then((token) =>{if (token) {this.loggedIn = true;}})
      .then((logged) =>{
        if (this.loggedIn == false)
        {this.navCtrl.push(LoginPage)}
        else{
          this.loadMyPOIs();
        }
      });

  };

  logout = () => this.security.logout().then(() => {this.loggedIn = false; location.reload()});


  itemTapped(event, poi) {
    this.navCtrl.push(ShowPoiPage, {
      poi: poi
    });
  }

  saveWantToVisitPoi = (tpoiID,want) => this.tLogService.wantToVistitPoi(tpoiID,want)
    .then(

      poi => {console.log("save want worked and this is want :"+want);
              this.searchItems[this.searchItems.map(e => e._id).indexOf(poi._id)]=poi;
      }
    )
    .catch(
      err => this.showAlert("ERROR",`${err.json().message}`)
    );

  wantToVisitPoi(tpoiID,want){
    console.log("want is "+want)
    if(want==true){
      want=false;
      console.log("oh you want to visit poi  )" +tpoiID + want);

    }else if(want==false){
      want=true;
      console.log("oh you want to visit poi )" +tpoiID + want);

    }else{
      console.log("default)" +tpoiID + want);
      want=false;
    }
    this.saveWantToVisitPoi(tpoiID,want);
  }
}
