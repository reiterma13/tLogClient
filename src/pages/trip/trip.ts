import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {Geolocation, ActionSheet} from "ionic-native";
import "leaflet";
import "drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers"
import {Tlog} from "../../providers/tlog";
import {Trip, POI} from "../../models/models";
import {AddPoiPage} from "../add-poi/add-poi";
import {ShowPoiPage} from "../show-poi/show-poi";
import {AddImagePage} from "../add-image/add-image";


/*
 Generated class for the Trip page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html'
})
export class TripPage {

  defaultLocation:L.LatLng =  new L.LatLng(47.0720698,15.4429915);
  center:L.LatLng = this.defaultLocation;
  map: L.Map;
  currentLocationMarker: L.Marker;
  markers: L.Marker[];
  currentLocationIcon: L.AwesomeMarkers.Icon;
  pictureIcon: L.AwesomeMarkers.Icon;
  standardIcon: L.AwesomeMarkers.Icon;
  trip: Trip = new Trip();
  path:L.Polyline;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private tlog: Tlog,
              private asCtrl: ActionSheetController
             ) {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
    this.currentLocationIcon = L.AwesomeMarkers.icon({
      icon: 'hand-o-down',
      markerColor: 'red'
    });
    this.pictureIcon = L.AwesomeMarkers.icon({
      icon: "picture-o",
      markerColor: "blue"
    });
    this.standardIcon = L.AwesomeMarkers.icon({
      icon: "star",
      markerColor: "blue"
    });
  }

  presentPOIActionSheet = (poi:POI):ActionSheet =>
    this.asCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          text: 'Show Details',
          handler: () => {
            this.showPoi(poi);
          }
        },
        {
          text: 'Edit POI',
          handler: () => {
            this.editPOI(poi);
          }
        },{
          text: 'Add Image',
          handler: () => {
            this.addImage(poi);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present();

  presentNewPOIActionSheet = () => {
    let actionSheet = this.asCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          text: 'Add POI',
          handler: () => {
            this.addPOI();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  poiToLatLng = (poi: POI) => L.latLng(poi.loc.coordinates[1], poi.loc.coordinates[0]);
  poiToCoords = (poi: POI) => L.marker(this.poiToLatLng(poi),
    {icon: (poi.images.length>0)?this.pictureIcon:this.standardIcon})
    .on('popupopen',this.onPopupOpen(poi));


  initMap = () => {
    if (this.map) this.map.remove();
    if (this.trip.pois.length > 0) this.center = this.poiToLatLng(this.trip.pois[this.trip.pois.length - 1]);
    this.map = L
        .map("map")
        .setView(this.center, 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.markers = this.trip.pois.map(poi => this.poiToCoords(poi).bindPopup(`<h4>${poi.name}</h4><p>${poi.description}</p>`));
    this.path = new L.Polyline(this.markers.map(m=>m.getLatLng()));
    this.map.addLayer(this.path);
    this.markers.forEach(m => m.addTo(this.map));
  };

  addCurrentLocationMarker = (pos: L.LatLng) => {
    if (!this.map) this.initMap();
    this.currentLocationMarker = L.marker(pos, {draggable: true, icon: this.currentLocationIcon})
      .bindPopup("<h3>You are here</h3><p>You can drag this marker. Press the '+' Icon in the Task Bar to add this POI.</p>")
      .addTo(this.map);
    this.currentLocationMarker.openPopup()
    this.currentLocationMarker.on("dragend", this.onMarkerPositionChanged.bind(this))
  };

  onMapClicked = (e) => {
    console.log("Map Clicked");
  };

  onMarkerPositionChanged = (e) => {
    console.log("Marker dragged");
  };

  onPopupOpen = (poi:POI) => (e:L.LeafletPopupEvent) => {
    this.map.panTo(e.target.getLatLng());
    this.presentPOIActionSheet(poi);
  };


  editPOI = (poi:POI) => {
    console.log("About to edit POI " + JSON.stringify(poi));
    this.navCtrl.push(AddPoiPage,
      {
        poi: poi,
        tripID: this.trip._id,
        coordinates: {lng: poi.loc.coordinates[0], lat:poi.loc.coordinates[1]}
      });
  };

  showPoi = (poi) => this.navCtrl.push(ShowPoiPage,{
    poi:poi
  });

  addImage = (poi:POI) => this.navCtrl.push(AddImagePage,{poi:poi,tripID: this.trip._id});

  addPOI = () => this.navCtrl.push(AddPoiPage,
    {
      tripID: this.trip._id,
      coordinates: this.currentLocationMarker.getLatLng()
    });


  ionViewWillEnter = () => {
    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
      this.currentLocationMarker = null;
    }
    console.log('Hello TripPage Page to show: ' + this.navParams.get("trip"));
    this.tlog.loadTrip(this.navParams.get("trip"))
      .then(trip => {
        this.trip = trip;
        if (this.trip.pois.length === 0) this.getCurrentPosition(); else this.initMap()
      })
  };


  getCurrentPosition = () => {
    let loader = this.loadingCtrl.create({content: "Trying to determine your current location ...."});
    loader.present();
    Geolocation.getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        this.center = new L.LatLng(resp.coords.latitude,resp.coords.longitude);
        this.addCurrentLocationMarker(this.center);
      })
      .catch(err => {
        loader.dismiss();
        this.center = this.defaultLocation;
        this.showAlert("INFO","Could not get your position, using a default location instead.");
        this.addCurrentLocationMarker(this.center);
      })
  };


}
