import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {POI} from "../../models/models";
import {Serverconfig} from "../../providers/serverconfig";
import {Tlog} from "../../providers/tlog";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Promise} from "es6-promise";


/*
 Generated class for the ShowPoi page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-show-poi',
  templateUrl: 'show-poi.html'
})
export class ShowPoiPage {

  poi: POI = new POI();


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public serverconfig: Serverconfig,
              public tlog: Tlog,
              private sanitizer: DomSanitizer) {
  }


  images: SafeUrl[];

  getImages = () =>  Promise.all(this.poi.images.map((image) => this.tlog.getImageURL(image.id)
    .then((url=>this.sanitizer.bypassSecurityTrustUrl(url)))))
    .then(urls => urls.forEach((url,i)=>this.poi.images[i].url=url));

  ngOnInit() {
    this.poi = this.navParams.get("poi");
    if(this.poi.images) {
      this.poi.images.forEach(img => img.uploaded = new Date(img.uploaded).toLocaleString());
      this.getImages();
    }
  }

  goBack = () => this.navCtrl.pop();

}
