import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
//import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Tlog } from "../../providers/tlog";
//import { Trip } from "../../models/models";

/*
  Generated class for the RateTrip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rate-trip',
  templateUrl: 'rate-trip.html'
})
export class RateTripPage {
  selectedItem:any;
  name:any;
  rating:any;
  action: any;

  //trip: Trip = new Trip();
  //tripForm: FormGroup;
  //mode = "edit";
 // action: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
             // private fb: FormBuilder,
              private alertCtrl: AlertController,
             private tLogService: Tlog
) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('trip');
    this.name = navParams.get('name');

    console.log('this.selectedItem '+this.selectedItem);
    console.log('this.rating '+this.rating);


    this.action = this.tLogService.rateTrip;

  }

  /*buildForm = (): void => {
    this.tripForm = this.fb.group({
      'rating': [this.rating]
    });
    };*/

  onSubmit = () => {
    console.log("Submitted Trip Rating Form!!")
  };

  ionViewWillEnter = () => {
    console.log('Hello RateTripPage Page to show: ' + this.navParams.get("trip"));
    console.log('Trip Name is : ' + this.navParams.get("name"));

  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  save = (tripID,rating) => {
    console.log('save rating function');
    console.log('tripID is '+tripID);
    console.log('rating is ' +rating);


    this.action(tripID, rating)
      .then(trip => {
        console.log("Saved Trip Rating successfully: "+JSON.stringify(trip));
        this.navCtrl.pop();
      })
      .catch(
        err => {
          console.error("Could not save trip rating.: " + JSON.stringify(err));
          this.showAlert("ERROR beim rating saving", `${err.json().message}`);
        }
      );



  }



  rateTrip = (tripID,tripName,rating) => {
    console.log("you rated trip" +tripName + " with " + rating + " stars!");

    this.rating = rating;

    let starOne   = document.getElementById('starOne');
    let starTwo   = document.getElementById('starTwo');
    let starTree  = document.getElementById('starTree');
    let starFour  = document.getElementById('starFour');
    let starFive  = document.getElementById('starFive');

    const ratedColor = 'gold';
    const defaultColor = 'lightgrey';

    if(rating == 1){
      starOne.style.color   = ratedColor;
      starTwo.style.color   = defaultColor;
      starTree.style.color  = defaultColor;
      starFour.style.color  = defaultColor;
      starFive.style.color  = defaultColor;
    }else if(rating == 2){
      starOne.style.color   = ratedColor;
      starTwo.style.color   = ratedColor;
      starTree.style.color  = defaultColor;
      starFour.style.color  = defaultColor;
      starFive.style.color  = defaultColor;
    }else if(rating == 3){
      starOne.style.color   = ratedColor;
      starTwo.style.color   = ratedColor;
      starTree.style.color  = ratedColor;
      starFour.style.color  = defaultColor;
      starFive.style.color  = defaultColor;
    }else if(rating == 4){
      starOne.style.color   = ratedColor;
      starTwo.style.color   = ratedColor;
      starTree.style.color  = ratedColor;
      starFour.style.color  = ratedColor;
      starFive.style.color  = defaultColor;
    }else if(rating == 5){
      starOne.style.color   = ratedColor;
      starTwo.style.color   = ratedColor;
      starTree.style.color  = ratedColor;
      starFour.style.color  = ratedColor;
      starFive.style.color  = ratedColor;
    }else{
      starOne.style.color   = defaultColor;
      starTwo.style.color   = defaultColor;
      starTree.style.color  = defaultColor;
      starFour.style.color  = defaultColor;
      starFive.style.color  = defaultColor;
    }
  }

  ngOnInit(): void {
    //this.buildForm();
    //this.action = this.tLogService.updateTrip;
  }


}
