import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Trip} from "../../models/models";
import {Tlog} from "../../providers/tlog";

/*
  Generated class for the AddTrip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html'
})
export class AddTripPage {

  tripForm: FormGroup;
  trip = new Trip();

  constructor(public navCtrl: NavController, private fb: FormBuilder, private tLogService: Tlog, private alertCtrl: AlertController) {}

  buildForm(): void {
    this.tripForm = this.fb.group({
      'name': [this.trip.name,[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
      'description': [this.trip.description,[Validators.maxLength(500)]],
      'begin': [this.trip.begin,[]],
      'end': [this.trip.begin,[]]
    });
  }

  showAlert = (title:string,message:string) => this.alertCtrl.create({title: title, message: message, buttons: ['OK']}).present();

  validationMessages = {
    'name': {
      'required': 'You need to enter a name',
      'maxlength': "Must not exceed 100 characters",
      'minlength': "Mimimum length 3 characters"
    },
    'description': {
      'maxlength': "Must not exceed 500 characters"
    },
    'begin': {
    },
    'end': {}
  };

  onSubmit = () => {console.log("Submitted TRIP Form!!")};

  ngOnInit(): void {
    this.buildForm();
    this.tripForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged = (data?: any) => {
    if (!this.tripForm) return;
    const form = this.tripForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  };

  formErrors = {
    'name':'',
    'description':'',
    'begin':'',
    'end':''
  };

  save = () => this.tLogService.addTrip(this.tripForm.value)
    .then(
      trip => this.navCtrl.pop()
    )
    .catch(
      err => this.showAlert("ERROR",`${err.json().message}`)
    );

  ionViewDidLoad() {

  }

}
