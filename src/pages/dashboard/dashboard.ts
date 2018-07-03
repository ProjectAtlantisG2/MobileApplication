import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { Chart } from 'chart.js';
import { Storage } from "@ionic/storage";

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

  @ViewChild('tempChart') lineCanvas;
  @ViewChild('humidityChart') humidityCanvas;
  @ViewChild('refresh') refreshIcon;

  devicesData = 'complex';
  // Degeux mais fonctionne en local test DevApp #BalanceTonCode
  devicesListLocal: any = [
    {
      "name":"Thermometer #1",
      "deviceid": "755cbb65-431a-4f68-a3a0-f7662bc48ba2",
      "macAddress": "00:0a:95:9d:68:16",
      "elapsedBetweenPoints": 1000,
      "idEmployee": {
        "timestamp": 1530632711,
        "machineIdentifier": 4302123,
        "processIdentifier": 9600,
        "counter": 5852569,
        "time": 1530632711000,
        "date": "2018-07-03T15:45:11.000+0000",
        "timeSecond": 1530632711
      },
      "uuid": "755cbb65-431a-4f68-a3a0-f7662bc48ba2",
      "category": "sensor",
      "metric": "celsius",
      "data": [
        {
          "month": "january",
          "days": [
            {
              "daynumber":1,
              "points": [
                37,
                36,
                34,
                37,
                39,
                38,
                30,
                33,
                30,
                35
              ]
            },
            {
              "daynumber":2,
              "points": [
                36,
                36,
                34,
                37,
                36,
                35,
                32,
                31,
                30,
                34
              ]
            },
            {
              "daynumber":3,
              "points": [
                36,
                33,
                34,
                34,
                36,
                35,
                32,
                33,
                30,
                31
              ]
            }
          ]
        }
      ]
    },
    {
      "name":"Humidity sensor #1",
      "deviceid": "3877e786-8f2b-4e9e-935b-26c34e34f25c",
      "macAddress": "00:0a:95:9d:68:16",
      "elapsedBetweenPoints": 1000,
      "idEmployee": {
        "timestamp": 1530632711,
        "machineIdentifier": 4302123,
        "processIdentifier": 9600,
        "counter": 5852569,
        "time": 1530632711000,
        "date": "2018-07-03T15:45:11.000+0000",
        "timeSecond": 1530632711
      },
      "category": "sensor",
      "metric": "percentage",
      "uuid":"a219ae54-324c-44ad-a1dd-2018a5deba1a",
      "data": [
        {
          "month": "lorem",
          "days": [
            {
              "dayNumber": 1,
              "points": [
                37,
                36,
                34,
                37,
                39,
                38,
                30,
                33,
                30,
                35
              ]
            },
            {
              "dayNumber": 2,
              "points": [
                35,
                36,
                31,
                38,
                33,
                36,
                38,
                38,
                39,
                39
              ]
            },
            {
              "dayNumber": 3,
              "points": [
                34,
                33,
                38,
                32,
                32,
                30,
                35,
                34,
                33,
                34
              ]
            },
            {
              "dayNumber": 4,
              "points": [
                38,
                34,
                38,
                32,
                37,
                38,
                32,
                39,
                39,
                33
              ]
            },
            {
              "dayNumber": 5,
              "points": [
                33,
                34,
                34,
                36,
                35,
                33,
                37,
                30,
                31,
                31
              ]
            },
            {
              "dayNumber": 6,
              "points": [
                39,
                38,
                33,
                34,
                35,
                39,
                34,
                38,
                33,
                32
              ]
            }
          ]
        }
      ]
    },
    {
      "name":"LED #1",
      "macAddress":"65:5D:21:DD:A2:16",
      "category":"device",
      "uuid":"a24aaa33-324c-485a-bddd-208103999999",
      "status":false
  }];
  temperatureChart: any;
  humidityChart: any;
  // ComplexData en attendant de régler les pb de CORS en dev
  complexData: any = {
    "meanTemp": {
      "title": "Mean Teamperature (last 7 days)",
      "label": "Mean temperature (°C)",
      "temperatures" : [20,21,24,23,22,24,23]
    },
    "humidityLevel": {
      "title": "Mean humidity level (last 7 days)",
      "label": "Humidity level (%)",
      "level" : [45,45,46,46,47,46,45]
    }
  };
  devices:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProv: DataProvider, private storage: Storage) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.drawCharts();
  }

  private dashboardRefresh() {
    this.devices = this.dataProv.getDevicesList();
  }

  drawCharts():any{
    this.temperatureChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["27/06", "28/06", "29/06", "30/06", "01/07", "02/07", "03/07"],
        datasets: [
          {
            label: this.complexData.meanTemp.label,
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
            data: this.complexData.meanTemp.temperatures,
            spanGaps: false,
          }
        ]
      }

    });
    this.humidityChart = new Chart(this.humidityCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["27/06", "28/06", "29/06", "30/06", "01/07", "02/07", "03/07"],
        datasets: [
          {
            label: this.complexData.humidityLevel.label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 0.4)",
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
            data: this.complexData.humidityLevel.level,
            spanGaps: false,
          }
        ]
      }

    })
  }

  reorderItems(indexes) {
    this.devicesListLocal = reorderArray(this.devicesListLocal, indexes);
  }

  navigateToDevice(device) {
    this.navCtrl.push('DevicesPage', {
       device : device
       // deviceListLocal : this.devicesListLocal
    });
  }

  storeDevices(deviceList){

  }

}
