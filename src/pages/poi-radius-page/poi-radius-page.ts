import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {Geolocation} from "ionic-native";
import {POI} from "../../models/models";
import {ShowPoiPage} from "../show-poi/show-poi";

/*
  Generated class for the POIRadiusPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-poi-radius-page',
  templateUrl: 'poi-radius-page.html'
})
export class POIRadiusPage {
  defaultLocation:L.LatLng =  new L.LatLng(47.0720698,15.4429915);
  center:L.LatLng = this.defaultLocation;
  map: L.Map;
  currentLocationMarker: L.Marker;
  markers: L.Marker[];
  markersFiltered: L.Marker[];

  radius: number = 1000;
  filterCircle: L.Circle = L.circle(this.center, this.radius, {
    opacity: 1,
    weight: 1,
    fillOpacity: 0.1
  });
  pois: POI[];

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private tlog: Tlog,
              private asCtrl: ActionSheetController
  ) {}

  initMap = () => {
    if (this.map) this.map.remove();
    this.map = L
      .map("map")
      .setView(this.center, 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    /*this.filterCircle = L.circle(this.center, this.radius, {
      opacity: 1,
      weight: 1,
      fillOpacity: 0.9
    })*/
    this.filterCircle.setLatLng(this.center);
    this.filterCircle.addTo(this.map);
    this.markers = this.pois.map(poi => this.poiToCoords(poi).bindPopup(`<h4>${poi.name}</h4><p>${poi.description}</p>`));
    this.markersFiltered = this.markers.filter((poi) => {
      return this.center.distanceTo(L.latLng(
          poi.getLatLng().lat,
          poi.getLatLng().lng)) < this.radius;
    });
    this.markersFiltered.forEach(m => m.addTo(this.map));
    this.currentLocationMarker.addTo(this.map);
  };

  poiToLatLng = (poi: POI) => L.latLng(poi.loc.coordinates[1], poi.loc.coordinates[0]);
  poiToCoords = (poi: POI) => L.marker(this.poiToLatLng(poi)).on('popupopen',this.onPopupOpen(poi));

  onPopupOpen = (poi:POI) => (e:L.LeafletPopupEvent) => {
    this.map.panTo(e.target.getLatLng());
    this.showPoi(poi);
  };

  showPoi = (poi) => this.navCtrl.push(ShowPoiPage,{
    poi:poi
  });

  ionViewWillEnter = () => {
    this.tlog.getAllPOIs()
      .then(pois => {
        this.pois = pois
        this.getCurrentPosition();
      })
  };

  changeRadius = (changes) => {

    this.filterCircle.setRadius(this.radius);
    this.markersFiltered.forEach(marker => this.map.removeLayer(marker));
    this.markersFiltered = this.markers.filter((poi) => {
      return this.center.distanceTo(L.latLng(
          poi.getLatLng().lat,
          poi.getLatLng().lng)) < this.radius;
    });
    this.markersFiltered.forEach(m => m.addTo(this.map));
    this.currentLocationMarker.addTo(this.map);
  }

  getCurrentPosition = () => {
    let loader = this.loadingCtrl.create({content: "Trying to determine your current location ...."});
    loader.present();
    Geolocation.getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        this.center = new L.LatLng(resp.coords.latitude,resp.coords.longitude);
        this.addCurrentLocationMarker(this.center);
        this.initMap();
      })
      .catch(err => {
        loader.dismiss();
        this.center = this.defaultLocation;
        this.showAlert("INFO","Could not get your position, using a default location instead.");
        this.addCurrentLocationMarker(this.center);
        this.initMap();
      })
  };

  onMarkerPositionChanged = (e) => {
    console.log("Marker dragged");
  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  addCurrentLocationMarker = (pos: L.LatLng) => {
    //if (!this.map) this.initMap();
    this.currentLocationMarker = L.marker(pos, {
      /*,
       icon: this.currentLocationIcon
       */})
      .bindPopup("<h3>You are here</h3>")
  };
}
