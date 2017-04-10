import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { Http } from '@angular/http';
import * as xml2js from 'xml2js';


@Component({
  selector: 'page-nhsChoices',
  templateUrl: 'nhsChoices.html'
})

export class nhsChoices {

  
  constructor(private navCtrl: NavController, private auth: Auth, public navParams: NavParams, private http: Http
  , private alertCtrl: AlertController) {
//    this.param = this.navParams.get('result');

    setTimeout(() => {

      let address = 'http://v1.syndication.nhschoices.nhs.uk/.xml?apikey=EJLCYYDR';

      this.http.get(address).subscribe(
        (data) => {

          this.showError(String(data));
            
        },
        err => {
            this.showError(err);
        })

     })

  }

  showError(text) {                              //Error Alert function using AlertController

    setTimeout(() => {
    //   this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Status',
      subTitle: text._body,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}