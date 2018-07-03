import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  devicesData = 'complex';
  devicesList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProv: DataProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  private dashboardRefresh() {
    this.devicesList = this.dataProv.getDevicesList();
  }

}
