import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
import { Chart } from 'chart.js';
import {errorHandler} from "@angular/platform-browser/src/browser";
// import { HttpClient} from '@angular/common/http';
// import { Storage } from "@ionic/storage";

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

  @ViewChild("sensorHistory") sensorHistory;
  device:any;
  getLog=[];
  deviceChart:any;
  authorization:string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTMxNDAzNjE2fQ.r4VskLh52U7Q_X53AYZXlbPItvk_uIesAQt-2Bx2j_bOnvUV-OKCcw0qJW_g1VhL4n135anaDc1N7hhmpyrJHw";
  apiURL:string = "http://82.237.255.86:8080/api-0.0.1-SNAPSHOT/";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HTTP) {
    this.device = this.navParams.get("device");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DevicesPage');
    if (this.device.category == 'sensor'){
      this.drawCharts();
    }
  }

  // Get device Advanced data from API
  getDeviceData() {
    let url = ""+this.apiURL+"devices/"+this.device.uuid+"";
    let getReq = this.http.get(url,
      {
        "Authorization": this.authorization
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

  // Send command to the device
  sendCommand(device){
    let status:any = device.status;
    let cmd;
    let url = "http://82.237.255.86:8080/api-0.0.1-SNAPSHOT/command/"+this.device.uuid+"";
    if (status == true){
      device.status = false;
      cmd = "0"
    }
    if (status == false){
      device.status = true;
      cmd = "1"}
    let cmdPost = this.http.post(url,
        {
          'cmd':cmd
        },
        {'Authorization':this.authorization}
      );
    cmdPost.then((response)=>{
      this.getLog.push(response.status);
    }, (error) => {
      this.getLog.push(error.status);
    });
  }

  drawCharts(){
    let dataLength = this.device.data.length;
    let chartData =  this.device.data[dataLength];
    this.deviceChart = new Chart(this.sensorHistory.nativeElement, {
      type: 'line',
      data: {
        labels: ["28/06", "29/06", "30/06", "01/07", "02/07", "03/07", "04/07"],
        datasets: [
          {
            label: this.device.name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartData,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
