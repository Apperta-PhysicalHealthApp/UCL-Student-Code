import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import {Auth} from '../../providers/auth';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { Http } from '@angular/http';
import { DomainResult } from '../domainResult/domainResult';
import { Latest } from '../latestTestResults/latest';
import { DomainPage } from '../domainPage/domainPage';


@Component({
  selector: 'page-mainDomain',
  templateUrl: 'mainDomain.html'
})

export class mainDomain {

    generalHealth = [
        {name: 'BMI', id: 'BMI'},
        {name: 'Blood Pressure', id: 'BLOOD'},
        {name: 'Lipids', id: 'LIPIDS'}
    ];

    heartHealth = [
        {name: 'Fasting cholesterol', id: 'CHOLESTEROL'},
        {name: 'HbA1c', id: 'HBA1C'},
        {name: 'ECGs', id: 'ECG'},
        {name: 'Fasting Blood Sugar', id: 'FBSUGAR'}
    ];

    hormone = [
        {name: 'Prolactin', id: 'PROLACTIN'}
    ]

    liverHealth = [
        {name: 'Liver Functions', id: 'LIVER'}
    ];

    kidneyHealth = [
        {name: 'Renal Functions', id: 'RENAL'}
    ];

    domains = [
        {name: 'General Health', tests: this.generalHealth},
        {name: 'Heart Health', tests: this.heartHealth},
        {name: 'Hormone', tests: this.hormone},
        {name: 'Liver Health', tests: this.liverHealth},
        {name: 'Kidney Health', tests: this.kidneyHealth},
    ];

  
  constructor(private navCtrl: NavController, private http: Http, private alertCtrl: AlertController) {

  }

  sendToDomain(name, tests){
    this.navCtrl.push(DomainPage, {domainName: name, tests: tests})
  }                                                                 //with the test's id and name.
  loadAll(){
      this.navCtrl.push(Latest);                                        //Send to Latest page
  }
//   infoPopup(name) {
//     let alert = this.alertCtrl.create({
//       title: name,
//       subTitle: "Infromation about " + name,
//       buttons: ['OK']
//     });
//     alert.present(prompt);
//   }
}