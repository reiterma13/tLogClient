import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Security} from "../../providers/security";
import {RegisterPage} from "../register/register";
import {ListPage} from "../list/list";


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public password: string;
  public username: string;
  public error: string;
  constructor(private navCtrl: NavController, private security: Security, private alertCtrl: AlertController) {

  }

  showAlert = (title:string,message:string) =>
    this.alertCtrl.create({title: title, message: message, buttons: ['OK']}).present();


  login = () =>
      this.security.login(this.username,this.password)
      .then(()=>this.navCtrl.setRoot(ListPage))
      .catch((err) => {
        this.showAlert("Error",`Could not log you in: ${err._body}`)}
      );


  register = () => this.navCtrl.push(RegisterPage)


}
