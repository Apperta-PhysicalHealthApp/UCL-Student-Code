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

    items = [                                                 //Items which are being displayed in the HTML 
        {name: 'Fasting cholesterol', id: 'CHOLESTEROL'},
        {name: 'Lipids', id: 'LIPIDS'},
        {name: 'Prolactin', id: 'PROLACTIN'},
        {name: 'Renal Functions', id: 'RENAL'},
        {name: 'Blood Pressure', id: 'BLOOD'},
        {name: 'ECGs', id: 'ECG'},
        {name: 'BMI', id: 'BMI'},
        {name: 'Fasting Blood Sugar', id: 'FBSUGAR'},
        {name: 'HbA1c', id: 'HBA1C'},
        {name: 'Liver Functions', id: 'LIVER'},
    ];

  
  constructor(private navCtrl: NavController, private http: Http, private alertCtrl: AlertController) {

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