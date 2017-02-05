import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Tlog } from "../../providers/tlog";

/*
  Generated class for the RatePoi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rate-poi',
  templateUrl: 'rate-poi.html'
})
export class RatePoiPage {

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
    this.selectedItem = navParams.get('poi');
    this.name = navParams.get('name');

    console.log('this.selectedItem '+this.selectedItem);
    console.log('this.rating '+this.rating);


    this.action = this.tLogService.ratePoi;

  }

  /*buildForm = (): void => {
   this.poiForm = this.fb.group({
   'rating': [this.rating]
   });
   };*/

  onSubmit = () => {
    console.log("Submitted Poi Rating Form!!")
  };

  ionViewWillEnter = () => {
    console.log('Hello RatePoiPage Page to show: ' + this.navParams.get("poi"));
    console.log('Poi Name is : ' + this.navParams.get("name"));

  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  save = (poiID,rating) => {
    console.log('save rating function');
    console.log('poiID is '+poiID);
    console.log('rating is ' +rating);


    this.action(poiID, rating)
      .then(poi => {
        console.log("Saved Poi Rating successfully: "+JSON.stringify(poi));
        this.navCtrl.pop();
      })
      .catch(
        err => {
          console.error("Could not save poi rating.: " + JSON.stringify(err));
          this.showAlert("ERROR beim poi rating saving", `${err.json().message}`);
        }
      );



  }



  ratePoi = (poiID,poiName,rating) => {
    console.log("you rated poi " +poiName + " with " + rating + " stars!");

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
    //this.action = this.tLogService.updatePoi;
  }


}
