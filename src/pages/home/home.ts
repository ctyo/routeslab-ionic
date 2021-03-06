import { AddPage } from './../add/add';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  routes:Array<any> = [];
  isGPS: Boolean = false;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private geolocation: Geolocation) {}

  ionViewDidEnter() {
    this.loadmap();

    this.storage.forEach( (route, url) => {
      if (route.segment && route.segment.length > 0) {
        let isWrited = this.routes.find(function(line) {
          return line.options.id === route.id
        });
        if (isWrited) {
          return
        }

        const line = leaflet.polyline(route.segment,{
          "color": "#0000ff",
          "weight": 6,
          "opacity": 0.5,
          "id": route.id //楽してrsidを入れたいので型を無視
        } as any);//.addTo(this.featureGroup);

        line.addTo(this.map);
        this.routes.push(line);
      }
    }).then(() => {
      if (this.routes.length > 0) {
        const featureGroup = new leaflet.FeatureGroup(this.routes);
        this.map.fitBounds(featureGroup.getBounds());
      }
    });
  }

  toggleGPS () {
    if (this.isGPS) {
      this.isGPS = false;
      document.getElementById('gps').style.color = '';
      return;
    }
    this.isGPS = true;
    document.getElementById('gps').style.color = '#387ef5';
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Success getting location');
      this.map.panTo(new leaflet.LatLng(resp.coords.latitude, resp.coords.longitude));
     }).catch((error) => {
       console.log('Error getting location', error);
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