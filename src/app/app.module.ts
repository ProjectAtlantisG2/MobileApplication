import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HttpClientModule } from "@angular/common/http";
import { HTTP } from "@ionic-native/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from "@ionic/storage";
import { DevicesProvider } from '../providers/devices/devices';
import {DevicesPage} from "../pages/devices/devices";
// import { DevicesPageModule } from "../pages/devices/devices.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    // DevicesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    HTTP,
    AuthProvider,
    DevicesProvider,
    DataProvider
  ]
})
export class AppModule {}
