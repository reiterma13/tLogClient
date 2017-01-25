import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"
import {User} from "../../models/models";
import {Security} from "../../providers/security";
import {ListPage} from "../list/list";


/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private EMAIL_REGEXP = "^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*$";

  registerForm: FormGroup;
  user: User = new User();
  error: string;

  constructor(public navCtrl: NavController, private fb:FormBuilder, private security: Security) {this.onValueChanged()}

  onSubmit() {
    this.user = this.registerForm.value;
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'username': [this.user.username,[Validators.required,Validators.maxLength(16),Validators.minLength(3)]],
      'email': [this.user.email,[Validators.required,Validators.minLength(5),Validators.maxLength(256),Validators.pattern(this.EMAIL_REGEXP)]],
      'password': [this.user.password,[Validators.required,Validators.minLength(8),Validators.maxLength(128)]]
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any){
    if (!this.registerForm) return;
    const form = this.registerForm;
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
  }



  validationMessages = {
    'username': {
      'required': 'You need to enter a username',
      'minlength': "Your username has to have at least 3 characters",
      'maxlength': "Your username must not be longer than 16 characters"
    },
    'password': {
      'required': 'You need to enter a password',
      'minlength': "Your password has to have at least 8 characters",
      'maxlength': "Your password must not be longer than 128 characters"
    },
    'email': {
      'required': 'You need to enter an email',
      'minlength': "Your email has to have at least 5 characters",
      'maxlength': "Your email must not be longer than 256 characters",
      'pattern': "You have to enter a valid email"
    }
  };

  formErrors = {
    'username':'',
    'password':'',
    'email':''
  };

  register() {
    this.security.register(this.registerForm.value).then(()=>this.navCtrl.setRoot(ListPage))
      .catch(err => this.error = err.message);
  }


  ionViewDidLoad() {

  }



}
