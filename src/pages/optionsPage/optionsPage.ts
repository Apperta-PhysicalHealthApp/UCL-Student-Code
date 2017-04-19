import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {Http} from '@angular/http';
import { Request } from '../createRequest/request';
import { Pending } from '../pending/pending';


@Component({
  selector: 'page-optionsPage',
  templateUrl: 'optionsPage.html'
})

export class OptionsPage {

    name: string;
    clinician: string;
    isOnline = this.auth.online;
    link = this.auth.mainUrl + "details/"

  
  constructor(private navCtrl: NavController, private auth: Auth, 
              public alertCtrl: AlertController, public http: Http) {

    if(this.auth.online){

    this.http.get(this.link).map(res => res.json()).subscribe(
        data => {
            this.name = data.patient_name;
            this.clinician = data.clinician_name;

            this.auth.add({name: this.name, clinician: this.clinician}, "userInformation");
        },
        err => {
            let alert = this.alertCtrl.create({
                title: 'Status',
                subTitle: err._body,
                buttons: ['OK']
            });
            alert.present(prompt);
        })
    }else{
        this.auth.retrieve("userInformation").then(data => { 
            this.name = data.name;
            this.clinician = data.clinician;
        })
    }
  }

  changeClinician(){
      let load = this.auth.mainUrl + 'request/refresh/';
      this.http.get(load).map(res => res.json()).subscribe(
      (data) => {

        if(data.pending_request == false){
            this.navCtrl.push(Request);
        }else{
            this.navCtrl.push(Pending);
        }
      },
      (error) => {
        let alert = this.alertCtrl.create({
        title: 'Status',
        subTitle: error._body,
        buttons: ['OK']
      });
      alert.present(prompt);
      });
  }

}