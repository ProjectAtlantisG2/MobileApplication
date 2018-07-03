import { Injectable } from '@angular/core';
import { AlertController } from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HTTP } from "@ionic-native/http";
import { Storage } from "@ionic/storage";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {

  _authorize: string = "https://partners-login.eliotbylegrand.com/authorize";
  _client_id: string = "358ca400-fdf6-4357-8cca-27caa6699197";
  _redirect_uri: string = "https://login.microsoftonline.com/tfp/oauth2/nativeclient";
  _response_type: string = "code";
  _state: string = "d8cdccaa-0c37-4493-ab37-d5d92bc99cd7";
  _client_secret: string = "*d,|`89Jnx/Ea5O8y$T724W4";
  storedURL: string;
  codeParam: string;
  response: any;

  auth_request: string =
    '' + this._authorize +
    '/?client_id=' + this._client_id +
    '&response_type=' + this._response_type +
    '&state=' + this._state +
    '&redirect_uri=' + this._redirect_uri +
    '';

  constructor(private iab: InAppBrowser, private http: HTTP, private storage: Storage, private alertCtrl:AlertController) {
  }

  authorizationEndPoint():any {
    // Create InAppBrowser with Oauth2 request
    const loginBrowser = this.iab.create(this.auth_request);

    // Waiting for the right URL with linking infos
    loginBrowser.on("loadstop").subscribe(event => {

      // Store the URL in device storage
      this.storage.set('url', event.url);

      // Read stored url to check if it's the one we want
      let storageURL = this.storage.get('url');
      Promise.all([storageURL]).then((url) => {
        let finalURL = url;
        let regex = /tfp/gi;
        // console.log("URL : ", finalURL);
        if (finalURL.toString().search(regex) == -1) {
          return false
        } else {
          this.storedURL = finalURL.toString();
          // console.log("StoredURL : " + this.storedURL);
          loginBrowser.close();

          // Request token with data got in previous URL
          this.getTokenEndPoint(this.storedURL);
        }
      });
    });
  }

  getTokenEndPoint(authURL):any {
    // Get 'code' parameter from authentication URL
    this.codeParam = new URL(authURL).searchParams.get('code');
    // Creation du POST URL
    let postURL:string =
      'https://partners-login.eliotbylegrand.com/token' +
      '/?client_id=' + this._client_id +
      '&grant_type=authorization_code' +
      '&code=' + this.codeParam +
      '&client_secret=' + this._client_secret;

    // HTTP POST
    let httPost = this.http.post(
      postURL,
      {
        client_id: this._client_id,
        grant_type: 'authorization_code',
        code: this.codeParam,
        client_secret: this._client_secret
      },
      {}
    ).then((response) => {
      this.response = JSON.parse(response.data);
      // console.log('POST response :'+this.response.data);
      this.storage.set('response', this.response);
      Promise.all( [response.data]).then((data) => {
        let dateNow:Date = new Date();
        this.response = data.toString();
        if (this.response != null){
          this.response = JSON.parse(this.response);
          this.storage.set("access_token", this.response.access_token);
          let parsedToken = this.parseJwt(this.response.access_token);
          if (parsedToken.exp <= dateNow.getTime()){
              // alert("Successful login");
              this.storage.set('loginStatus', 1);
          } else {
            console.log("Expiration : "+parsedToken.exp);
            alert("Expired token, please refresh your login !");
            this.storage.set('loginStatus', 0);
          }
        } else return false
      });
    });
  }

  private parseJwt (token):any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

}
