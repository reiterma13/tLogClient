import { Component } from '@angular/core';

import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {Security} from '../../providers/security';
import {LoginPage} from "../login/login";
import {Trip} from "../../models/models";
import {Tlog} from "../../providers/tlog";
import {AddTripPage} from "../add-trip/add-trip";
import {TripPage} from "../trip/trip";
import {FormGroup, FormBuilder} from "@angular/forms";
import {RateTripPage} from "../rate-trip/rate-trip";

@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<Trip>;
  searchItems: Array<Trip>;
  tripForm: FormGroup;
  trip = new Trip();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private fb: FormBuilder) {
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

  addTrip = () => this.navCtrl.push(AddTripPage);

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


  getRandom = (arr: Array<Trip> , n:number) => {
    var result = new Array(n);
    var len = arr.length;
    var taken = new Array(len);
    var tempResults = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
    tempResults = result.filter(function(item,pos) {
      return result.indexOf(item) === pos;
    });


    return tempResults;
};

  loadRandomTrips = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching random trips"
    });
    loading.present()
      .then(this.tLogService.getAllTrips)
      .then(trips => this.items = trips).then(() => {
      this.items = this.getRandom(this.items, 5);
      this.initSearchItems();
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

  loadAllTrips = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching all trips"
    });
    loading.present()
      .then(this.tLogService.getAllTrips)
      .then(trips => this.items = trips).then(() => {
      this.initSearchItems();
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

  ionViewWillEnter = () => {
    this.security.isNotloggedIn().then(exp => {
      if (exp) {this.navCtrl.setRoot(LoginPage)}
      else {this.loadTrips();}
    });
  }

  itemTapped(event, tripID) {
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }


  buildForm(): void {
    this.tripForm = this.fb.group({
      'liked': [this.trip.liked,[]]
    });
  }

  onSubmit = () => {console.log("Submitted TRIP Form because liked is "+this.trip.liked)};

  ngOnInit():void{
    this.buildForm();
  }

  save = (tripID,liked) => this.tLogService.likeTrip(tripID,liked)
    .then(

      trip => console.log("save worked and this is trip :"+trip)
    )
    .catch(
      err => this.showAlert("ERROR",`${err.json().message}`)
    );

  likeTrip(tripID,liked){
    console.log("oh you like )" +tripID + liked);
    this.save(tripID,liked);
  }

  dislikeTrip(tripID,liked){
    console.log("oh you don't like )" +tripID + liked);
    this.save(tripID,liked);
  }

  rateTrip(tripID, tripName) {
    console.log("tripID is "+tripID);
    console.log("trip name is "+tripName);
    this.navCtrl.push(RateTripPage, {
      trip: tripID,
      name: tripName
    });

  }


}
