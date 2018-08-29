import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  route: { url: string; };
  constructor(public navCtrl: NavController) {
    this.route = {'url':''};
  }



  ionViewDidEnter() {
  }

  add () {
    let m = this.route.url.match(/https:\/\/latlonglab\.yahoo\.co\.jp\/route\/watch\?id=(.+)/);
    if (!m) {
      return;
    }
    let id = m[1];

    // 圧倒的につまづいてる。
    // https://forum.ionicframework.com/t/ionic-2-form-with-ngmodel/123136/5 ここ参照でつづける
  }
}
