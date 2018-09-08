import { AddPage } from './../add/add';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  routes:Array<any> = [];

  constructor(public navCtrl: NavController, private storage: Storage) {}

  ionViewDidEnter() {
    this.loadmap();


    this.storage.forEach( (route, url) => {
      if (route.segment && route.segment.length > 0) {
        const line = leaflet.polyline(route.segment,{
          "color": "#0000ff",
          "weight": 6,
          "opacity": 0.5
        });//.addTo(this.featureGroup);
        line.addTo(this.map);
        this.routes.push(line);
      }
    }).then(() => {
      const featureGroup = new leaflet.FeatureGroup(this.routes);
      this.map.fitBounds(featureGroup.getBounds());

      //this.featureGroup.addTo(this.map);
    });
  }

  goAddPage () {
    this.navCtrl.push(AddPage)
  }
  loadmap() {
    if (this.map) {
      return;
    }

    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
  }
}