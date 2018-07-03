import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient} from '@angular/common/http';
import {HTTP} from "@ionic-native/http";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  device:any;
  getLog=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HTTP) {
    this.device = this.navParams.get("device");
    // this.deviceListLocal = this.navParams.get("deviceListLocal");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DevicesPage');
  }

  getDeviceData() {
    let url = "http://82.237.255.86:8080/api-0.0.1-SNAPSHOT/devices/5b3bdd424d5c312cf0d3d20c";
    let getReq = this.http.get(url,
      {
        "Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTMxNDAzNjE2fQ.r4VskLh52U7Q_X53AYZXlbPItvk_uIesAQt-2Bx2j_bOnvUV-OKCcw0qJW_g1VhL4n135anaDc1N7hhmpyrJHw"
      },
      {}
      );
    getReq.then((response) =>
    {
      let responseData = JSON.parse(response.data);
      this.getLog.push(responseData);
    });
    getReq.catch((error) =>
    {
      this.getLog.push(error.status);
    });
  };

  sendCommand(device){
    let status = device.status;
    setTimeout(() =>
      "", 10000);
    if (status == true){
      device.status = false;
    }else
      {
        device.status = true;
      }
  }
}
