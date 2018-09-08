import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

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
    let req:string = 'http://localhost/lllab/route/get?format=gpx&id='+m[1];

    this.http.get(req, {responseType: 'text'}).subscribe(data => {
      // Read the result field from the JSON response.
      this.parseXML(data)
      .then((d)=>
      {
         console.dir(d)
      });
    });

    // 圧倒的につまづいてる。
    // https://forum.ionicframework.com/t/ionic-2-form-with-ngmodel/123136/5 ここ参照でつづける
  }


  parseXML(data)
  {
     return new Promise(resolve =>
     {
        var k,
            arr    = [],
            parser = new xml2js.Parser(
            {
               trim: true,
               explicitArray: true
            });

        parser.parseString(data, function (err, result)
        {
           resolve(result);
        });
     });
  }
}
