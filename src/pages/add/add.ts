import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

interface Route {
  title:String;
  segment:Array<Object>;
}

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  routes: Array<Route> = [];
  url: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.url = '';
    var routes:Array<Route> = [];
    this.routes = routes;
  }

  ionViewDidEnter() {
    this.storage.forEach( (route, url) => {
      this.routes.push(route);
    });
  }

  add () {
    if (!this.url) {
      this.url = 'https://latlonglab.yahoo.co.jp/route/watch?id=6f4844c46b63c38d43f4aaeefd34619c';
    }

    let m = this.url.match(/https:\/\/latlonglab\.yahoo\.co\.jp\/route\/watch\?id=(.+)/);
    if (!m) {
      return;
    }
    let req:string = 'http://localhost/lllab/route/get?format=gpx&id='+m[1];

    this.http.get(req, {responseType: 'text'}).subscribe(response => {
      // Read the result field from the JSON response.
      this.parseXML(response)
      .then((route:Route)=>
      {
        // 保存
        this.storage.set(this.url, route);
        this.routes.unshift(route);
      });
    });
  }


  parseXML(data)
  {
     return new Promise(resolve =>
     {
        var parser = new xml2js.Parser(
            {
               trim: true,
               explicitArray: true
            });
        parser.parseString(data, function (err, result:any)
        {
          let ret:Route = {
            title: result.gpx.trk[0].name,
            segment:[],
          }
          for (const i in result.gpx.trk[0].trkseg[0].trkpt) {
            ret.segment.push({
              Lat: result.gpx.trk[0].trkseg[0].trkpt[i].$.lat,
              Lon: result.gpx.trk[0].trkseg[0].trkpt[i].$.lon
            });
          }
//          console.dir(ret);
          resolve(ret);
        });
     });
  }
}
