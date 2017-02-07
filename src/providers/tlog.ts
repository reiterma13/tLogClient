import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {Promise} from "es6-promise";
import {Serverconfig} from "./serverconfig";
import {Trip, POI} from '../models/models';
import {Security} from "./security";


/*
 Generated class for the Tlog provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Tlog {

  constructor(private authHttp: AuthHttp,
              private serverconfig: Serverconfig,
              private security: Security) {

  }

  getTrips = (): Promise<Array<Trip>> => this.authHttp.get(this.serverconfig.mineURI).toPromise().then((res) => res.json());

  getAllTrips = (): Promise<Array<Trip>> => this.authHttp.get(this.serverconfig.allTripsURI).toPromise().then((res) => res.json());

  getMyPOIs = (): Promise<Array<POI>> => this.authHttp.get(this.serverconfig.myPoiURI).toPromise().then((res) => res.json());

  getAllPOIs = (): Promise<Array<POI>> => this.authHttp.get(this.serverconfig.poiURI).toPromise().then((res) => res.json());

  addTrip = (trip: Trip): Promise<Trip> =>
    this.authHttp.post(this.serverconfig.tripURI, trip).toPromise()
      .then(res => res.json());

  loadTrip = (tripID: string): Promise<Trip> =>
    this.authHttp.get(`${this.serverconfig.tripURI}/${tripID}`)
      .toPromise().then(res => res.json());

  addPOI = (tripID: string, poi: POI): Promise<POI> =>
    this.authHttp.post(`${this.serverconfig.tripURI}/addpoi/${tripID}`, poi)
      .toPromise().then(res => res.json());


  updatePOI = (tripID: string, poi: POI): Promise<POI> =>
    this.authHttp.patch(`${this.serverconfig.poiURI}/${poi._id}`, poi)
      .toPromise().then(res => {
      console.log("GOT UPDATE RESPONSE: " + res.json());
      return res.json()
    });

  rateTrip = (tripID: string, rating: number ): Promise<Trip> =>{
    let ratingO = {number: rating};
    console.log("rating is "+ratingO);
    return this.authHttp.patch(`${this.serverconfig.tripURI}/${tripID}/rate`, ratingO)
      .toPromise().then(res => {
      console.log("GOT UPDATE Rate Trip RESPONSE: " + res.json());
      return res.json()
    });
  };

  ratePoi = (poiID: string, rating: number ): Promise<POI> => {

    let ratingO = {number: rating};
    console.log("rating is "+ratingO);
    return this.authHttp.patch(`${this.serverconfig.poiURI}/${poiID}/rate`, ratingO)
      .toPromise().then(res => {
      console.log("GOT UPDATE Rate Poi RESPONSE: " + res.json());
      return res.json()
    });
  }

  likeTrip = (tripID: string, trip: Trip) : Promise<Trip> =>
  this.authHttp.patch(`${this.serverconfig.tripURI}/${tripID}/like`,trip)
    .toPromise().then(res => {
    console.log("GOT UPDATE Like Trip RESPONSE: " + res.json());
    return res.json()
  });

  likePoi = (poiID: string, poi: POI) : Promise<POI> =>
    this.authHttp.patch(`${this.serverconfig.poiURI}/${poiID}/like`,poi)
      .toPromise().then(res => {
      console.log("GOT UPDATE Like poi RESPONSE: " + res.json());
      return res.json()
    });

  wantToVistitPoi = (poiID: string, poi: POI) : Promise<POI> =>
    this.authHttp.patch(`${this.serverconfig.poiURI}/${poiID}/want`,poi)
      .toPromise().then(res => {
      console.log("GOT UPDATE Want Poi RESPONSE: " + res.json());
      return res.json()
    });

  wantToMakeTrip = (tripID: string, trip: Trip) : Promise<Trip> =>
    this.authHttp.patch(`${this.serverconfig.tripURI}/${tripID}/want`,trip)
      .toPromise().then(res => {
      console.log("GOT UPDATE Want Trip RESPONSE: " + res.json());
      return res.json()
    });

  getImage = (imageId: string) =>
    this.authHttp.get(`${this.serverconfig.poiURI}/image/${imageId}`).toPromise();

  getImageURL = (imageId: string): Promise<string> => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    this.security.getToken()
      .then(token => {
        xhr.open("GET", `${this.serverconfig.poiURI}/image/${imageId}`);
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.responseType = "arraybuffer";

        xhr.onload = function (e) {
          // Obtain a blob: URL for the image data.
          let arrayBufferView = new Uint8Array(this.response);
          let blob = new Blob([arrayBufferView], {type: "image/jpeg"});
          let urlCreator = window.URL || (window as any).webkitURL;
          let imageUrl = urlCreator.createObjectURL(blob);
          resolve(imageUrl);
        };

        xhr.send();
      });
  });

}
