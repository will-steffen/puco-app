import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FollowPage } from '../follow/follow';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  level(l: number) {
    this.navCtrl.setRoot(FollowPage);
  }

}
