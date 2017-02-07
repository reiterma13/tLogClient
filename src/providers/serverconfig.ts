import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Serverconfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Serverconfig {

  //private _host = "http://169.254.154.55:3000/api";
  //private _host = "http://10.0.0.6:3000/api";
  private _host = "http://10.15.201.78:3000/api";
  //private _host = "http://10.15.201.78:3000/api";
  private _host = "http://localhost:3000/api";
  private _loginURI = `${this._host}/auth/login`;
  private _registerURI = `${this._host}/auth/signup`;
  private _mineURI = `${this._host}/trip/mine`;
  private _tripURI = `${this._host}/trip`;
  private _poiURI = `${this.host}/poi`;
  private _myPoiURI = `${this.host}/poi/mine`;
  private _allTripsURI = `${this._host}/trip/all`;

  public get host():string {return this._host};
  public get loginURI():string {return this._loginURI};
  public get registerURI():string {return this._registerURI};
  public get mineURI() {return this._mineURI};
  public get tripURI () {return this._tripURI};
  public get poiURI() {return this._poiURI};
  public get allTripsURI() {return this._allTripsURI};
  public get myPoiURI() {return this._myPoiURI};

  constructor() {
  }

}
