import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  url: string;
  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.url = '';
  }



  ionViewDidEnter() {
  }

  add () {
    this.url = 'https://latlonglab.yahoo.co.jp/route/watch?id=6f4844c46b63c38d43f4aaeefd34619c';

    let m = this.url.match(/https:\/\/latlonglab\.yahoo\.co\.jp\/route\/watch\?id=(.+)/);
    if (!m) {
      return;
    }
    let req:string = 'https://latlonglab.yahoo.co.jp/route/get?format=gpx&id='+m[1];

    this.http.get(req, {responseType: 'text'}).subscribe(data => {
      // Read the result field from the JSON response.
      console.dir(data);
    });

    // 圧倒的につまづいてる。
    // https://forum.ionicframework.com/t/ionic-2-form-with-ngmodel/123136/5 ここ参照でつづける
  }
}
