import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Security} from '../../providers/security';
import {LoginPage} from "../login/login";
import {Trip} from "../../models/models";
import {Tlog} from "../../providers/tlog";
import {AddTripPage} from "../add-trip/add-trip";
import {TripPage} from "../trip/trip";
import {RateTripPage} from "../rate-trip/rate-trip";

/*
  Generated class for the ListRatedTrips page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-rated-trips',
  templateUrl: 'list-rated-trips.html'
})
export class ListRatedTripsPage {
  selectedItem: any;
  icons: string[];
  items: Array<Trip>;
  searchItems: Array<Trip>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [];
    this.searchItems=[];
  }

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

  initSearchItems = () => this.searchItems = this.items;

  addTrip = () => this.navCtrl.push(AddTripPage)

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  loadAllTrips = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching all trips"
    });
    loading.present()
      .then(this.tLogService.getAllTrips)
      .then(trips => this.items = trips).then(() => {
      this.initSearchItems()
      loading.dismiss();
      if (this.items.length === 0) {
        this.showAlert("INFO", "There are no Trips yet. Press the Plus Icon to create one.")
      }
    })
      .catch(err => {
        loading.dismiss();
        this.showAlert("Error", `Could not retrieve list of trips: ${err.message || err}`);
      });
  }

  loadTrips = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching your trips"
    });
    loading.present()
      .then(this.tLogService.getTrips)
      .then(trips => this.items = trips).then(() => {
      this.initSearchItems()
      loading.dismiss();
      if (this.items.length === 0) {
        this.showAlert("INFO", "You do not have any trips yet. Press the Plus Icon to create one.")
      }
    })
      .catch(err => {
        loading.dismiss();
        this.showAlert("Error", `Could not retrieve list of trips: ${err.message || err}`);
      });
  }

  private loggedIn: boolean = false;
  ionViewWillEnter = () => {
    this.security.getToken().then((token) =>{if (token) {this.loggedIn = true;}})
      .then((logged) =>{
        if (this.loggedIn == false)
        {this.navCtrl.push(LoginPage)}
        else{
          this.loadTrips();
        }
      });
  };
  logout = () => this.security.logout().then(() => {
    this.loggedIn = false;
    location.reload()
  });


  itemTapped(event, tripID) {
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }

  rateTrip(tripID, tripName,rating) {
    console.log("tripID is "+tripID);
    console.log("trip name is "+tripName);
    this.navCtrl.push(RateTripPage, {
      trip: tripID,
      name: tripName
    });

  }

}



