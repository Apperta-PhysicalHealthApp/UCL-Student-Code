import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {Auth} from '../providers/auth';
import {RegisterPage} from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { Latest } from '../pages/latestTestResults/latest';
import { Upcoming } from '../pages/upcomingTest/upcoming';
import { Request } from '../pages/createRequest/request';
import { Pending } from '../pages/pending/pending';
import { viewTest } from '../pages/viewTest/viewTest';
import { DomainPage } from '../pages/domainPage/domainPage';
import { DomainResult } from '../pages/domainResult/domainResult';
import { nhsChoices } from '../pages/nhsChoices/nhsChoices';
import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    Latest,
    Upcoming,
    Request,
    Pending,
    viewTest,
    DomainPage,
    DomainResult,
    nhsChoices
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    Latest,
    Upcoming,
    Request,
    Pending,
    viewTest,
    DomainPage,
    DomainResult,
    nhsChoices
  ],
  providers: [Auth, Network]
})
export class AppModule {}
