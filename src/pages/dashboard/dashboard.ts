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
  devicesList: any = [{
      "name":"Thermometer #1",
      "macAddress":"65:5D:21:42:A6:0D",
      "category":"sensor",
      "metric":"celsius_degree",
      "uuid":"a244ae33-324c-44ad-bddd-208103deba1a",
      "data":21
    },
    {
      "name":"Humidity sensor #1",
      "macAddress":"8C:42:13:37:B4:A3",
      "category":"sensor",
      "metric":"humidity_level",
      "uuid":"a219ae54-324c-44ad-a1dd-2018a5deba1a",
      "data":47
    },{
      "name":"LED #1",
      "macAddress":"65:5D:21:DD:A2:16",
      "category":"device",
      "uuid":"a24aaa33-324c-485a-bddd-208103999999",
      "status":false
  }]; // DeviceList en attendant de régler les pb de CORS
  temperatureChart: any;
  humidityChart: any;
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
  }; // ComplexData en attendant de régler les pb de CORS
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
    this.devicesList = reorderArray(this.devicesList, indexes);
  }

  navigateToDevice(deviceID) {
    this.navCtrl.push('DevicesPage', {
       deviceID : deviceID
    });
  }

  storeDevices(deviceList){

  }

}
