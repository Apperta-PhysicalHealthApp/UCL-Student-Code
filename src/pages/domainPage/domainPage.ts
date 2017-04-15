import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import {Auth} from '../../providers/auth';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { Http } from '@angular/http';
import { DomainResult } from '../domainResult/domainResult';
import { Latest } from '../latestTestResults/latest';


@Component({
  selector: 'page-domainPage',
  templateUrl: 'domainPage.html'
})

export class DomainPage {

  name: string;
  items: any;

  
  constructor(private navCtrl: NavController, public navParams: NavParams, private http: Http, private alertCtrl: AlertController) {

    this.items = this.navParams.get('tests');         //recieve data from mainDomain page using NavParams
    this.name = this.navParams.get('domainName');

  }

  loadTestResult(id, name){
    this.navCtrl.push(DomainResult, {testType: id, name: name});        //When a test is clicked on, send to DomainResult page 
  }                                                                     //with the test's id and name.
  loadAll(){
      this.navCtrl.push(Latest);                                        //Send to Latest page
  }
  infoPopup(name) {
    let alert = this.alertCtrl.create({
      title: name,
      subTitle: "Infromation about " + name,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}