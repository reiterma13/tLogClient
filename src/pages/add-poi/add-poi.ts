import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Tlog} from "../../providers/tlog";
import {POI} from "../../models/models";


/*
 Generated class for the AddPoi page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-poi',
  templateUrl: 'add-poi.html'
})
export class AddPoiPage {

  poi: POI = new POI();
  poiForm: FormGroup;
  mode = "new";
  action: any;

  constructor(public navCtrl: NavController,
              private fb: FormBuilder,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private navParams: NavParams) {
  }

  buildForm = (): void => {
    this.poiForm = this.fb.group({
      'name': [this.poi.name, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      'description': [this.poi.description, [Validators.maxLength(500)]],
    });
  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  validationMessages = {
    'name': {
      'required': 'You need to enter a name',
      'maxlength': "Must not exceed 100 characters",
      'minlength': "Mimimum length 3 characters"
    },
    'description': {
      'maxlength': "Must not exceed 500 characters"
    }
  };

  onSubmit = () => {
    console.log("Submitted POI Form!!")
  };

  ngOnInit(): void {
    this.action = this.tLogService.addPOI;
    let poi = this.navParams.get("poi");
    if (poi) {
      this.mode = "edit";
      this.poi = poi;
      this.action = this.tLogService.updatePOI;
    }
    ;
    this.buildForm();
    this.poiForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged = (data?: any) => {
    if (!this.poiForm) return;
    const form = this.poiForm;
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
    'name': '',
    'description': ''
  };

  save = () => {
    console.log("SAVING POI!");
    const poi = this.poiForm.value;
    poi._id = this.poi._id;
    if (!this.poi.loc) {
      const coords: L.LatLng = this.navParams.get("coordinates");
      poi.loc = {coordinates: [coords.lng, coords.lat]};
    }
    this.action(this.navParams.get("tripID"), poi)
      .then(poi => {
        console.log("Saved POI successfully: "+JSON.stringify(poi));
        this.navCtrl.pop();
      })
      .catch(
        err => {
          console.error("Could not save POI.: " + JSON.stringify(err));
          this.showAlert("ERROR", `${err.json().message}`);
        }
      );
  };



}
