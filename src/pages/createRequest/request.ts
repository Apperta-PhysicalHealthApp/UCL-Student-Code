import { Component } from '@angular/core';
import { NavController,  AlertController, LoadingController, Loading } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {Pending} from '../pending/pending';
import { Http, Headers } from '@angular/http';
import {Auth} from '../../providers/auth';

@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})

export class Request {

  clinicianId: '';
  loading: Loading;
  data: any;
  values: any;

  link = this.auth.mainUrl + 'request/send/';
  

  constructor(private navCtrl: NavController, private http: Http, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, private auth: Auth) {

  }


  public send(){

      this.values = JSON.stringify({GMC_no: this.clinicianId});
  
      this.showLoading()                                            // Start loading prompot  

        setTimeout(() => {

        this.http.post(this.link, this.values).map(res => res.json()).subscribe(    //Send clinician id to database,
            (data) => {                                                   //recieve and convert the data to JSON format

              this.loading.dismiss();                                     //Stop loading prompot when data is recieved

              if(data.pending_request == false){0                          //The responose from the server is a token with values:
                this.showError("Invalid GMC number");                     //pending_request and has_clinician
              }                                                           
              else if(data.pending_request == true){

                let alert = this.alertCtrl.create({
                  title: 'Success',
                  subTitle: "Request sent",
                  buttons: ['OK']
                });
                alert.present(prompt);

                this.navCtrl.pop();
                this.navCtrl.push(Pending);                               //Send to pending page
              }
          
            },
            (error) => {
              this.loading.dismiss();
              this.showError(error);
            });
        });
    }

  showLoading() {                                                 //Create loading prompot using "LoadingController"
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {                                               //Create alert using AlertController
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Status',
      subTitle: text._body,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}


