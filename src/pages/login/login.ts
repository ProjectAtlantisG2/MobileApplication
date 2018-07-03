import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { DashboardPage } from "../dashboard/dashboard";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  login() {
    // this.auth.authorizationEndPoint();
    // let toto = this.storage.get('loginStatus');
    // Promise.all([toto]).then((toto)=>{
    //   if (toto.toString() == '1'){
    //     this.navCtrl.push('DashboardPage');
    //   }else { }
    // });
    this.navCtrl.push('DashboardPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
