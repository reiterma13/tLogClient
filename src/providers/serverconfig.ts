import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Serverconfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Serverconfig {

  private _host = "http://169.254.154.55:3000/api";
  private _loginURI = `${this._host}/auth/login`;
  private _registerURI = `${this._host}/auth/signup`;
  private _mineURI = `${this._host}/trip/mine`;
  private _tripURI = `${this._host}/trip`;
  private _poiURI = `${this.host}/poi`;

  public get host():string {return this._host};
  public get loginURI():string {return this._loginURI};
  public get registerURI():string {return this._registerURI};
  public get mineURI() {return this._mineURI};
  public get tripURI () {return this._tripURI};
  public get poiURI() {return this._poiURI};

  constructor() {
  }

}
