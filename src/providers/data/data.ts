// import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  // _apiHost: string = "http://192.168.192.249:8080"; // AzeromDesktop VPN
  _apiHost: string = "http://82.237.255.86:8080"; // AzeromPublic
  // _apiHost: string = "http://192.168.192.241:8080"; // AtlantisLinux VPN
  _testToken: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTMxNDAzNjE2fQ.r4VskLh52U7Q_X53AYZXlbPItvk_uIesAQt-2Bx2j_bOnvUV-OKCcw0qJW_g1VhL4n135anaDc1N7hhmpyrJHw";
  devices:any;

  constructor(public http: HTTP) {
    console.log('Hello DataProvider Provider');
  }

  apiSignup(){
    let apiURL: string = "" + this._apiHost + "/api-0.0.1-SNAPSHOT/signup";
    this.http.post(apiURL,
      {
        "eliotId":"test",
        "eliotChain":"password"
      },
      {}
    ).then((resp) => {
      console.log('this is ok');
      let respData = JSON.parse(resp.data);
      console.log('this is ok 2');
      let resHeader = JSON.parse(resp.headers);
      console.log('this is ok 3');
      // console.log(resHeader.Authorization);
    });
  }

  apiLogin(){
    console.log("Try Login");
    let apiURL: string = "" + this._apiHost + "/api-0.0.1-SNAPSHOT/login";
    this.http.post(apiURL,
      {
        "eliotId":"test",
        "eliotChain":"password"
      },
      {}
      ).then((resp) => {
        console.log('this is ok');
        let respData = JSON.parse(resp.data);
        console.log('this is ok 2');
        let resHeader = JSON.parse(resp.headers);
        console.log('this is ok 3');
        // console.log(resHeader.Authorization);
    });
  }

  getDevicesList():any {
    console.log("Start getDevicesList");
    let apiURL:string = ""+this._apiHost+"/api-0.0.1-SNAPSHOT/devices";
      this.http.get(apiURL,
        {
          "Authorization":this._testToken
        },{}
      ).then((response) => {
        let devicesList = JSON.parse(response.data);
        console.log('URL :'+ response.url.toString());
        console.log('Headers :'+ response.headers.toString());
        console.log('Data :'+ response.data.toString());
        console.log('Error :'+ response.error.toString());
        return devicesList;
      }).catch((error) => {
        console.log("Error status :"+error.status);
        console.log("Error error :"+error.error);
        console.log("Error headers :"+error.headers);
      });
  }

  getDevice(uuid):any {
    console.log("getDevicesList tentative");
    let apiURL:string = ""+this._apiHost+"/api-0.0.1-SNAPSHOT/devices/"+ uuid +"";
    this.http.get(apiURL,
      {
        "Authorization":this._testToken
      },{}
    ).then((response) => {
      let devicesList = JSON.parse(response.data);
      console.log('URL :'+ response.url.toString());
      console.log('Headers :'+ response.headers.toString());
      console.log('Data :'+ response.data.toString());
      console.log('Error :'+ response.error.toString());
      return devicesList;
    }).catch((error) => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

}
