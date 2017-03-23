import { Component } from '@angular/core';
import { NavController,  AlertController, LoadingController, Loading } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import { Http } from '@angular/http';
import { Auth } from '../../providers/auth';


@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html'
})

export class Pending {

  clinitanId: any;
  loading: Loading;
  data: any;
  hasClinician: boolean;
  clinicianId: any;

  constructor(private navCtrl: NavController, private http: Http, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, private auth:Auth) {

  }

  ionViewWillEnter(){                                                      //Run before the page has been rendered
    let load = this.auth.mainUrl + 'request/refresh/';
    this.http.get(load).map(res => res.json()).subscribe(
      (data) => {

        this.hasClinician = data.has_clinician;                             //Store token in variables
        this.clinicianId = data.clinician_id;
      },
      (error) => {
        this.showError(error);
      });
  }

  public refresh(refresher){ 
       
    setTimeout(() => {                                          //Initialise when swiping up

    let refreshLink = this.auth.mainUrl + 'request/refresh/';
    this.http.get(refreshLink).map(res => res.json()).subscribe(
      (data) => {                                                             //Recieve token
                                                            
        if(data.pending_request == false){
          if(data.has_clinician == false){
              this.showError("Request Rejected");                         //Request has been rejected if pending request and
              this.navCtrl.pop();
         }                                                               //has_clinician are false
          else if(data.has_clinician == true){
            if(this.clinicianId != data.clinician_id){
              let alert = this.alertCtrl.create({                          //if has_clinician evaluates to true, request hase
                title: 'Success',                                          //been approved
                subTitle: "Request Approved",
                buttons: ['OK']
              });
              alert.present(prompt);

              this.navCtrl.setRoot(HomePage);
            }
            else{
              this.showError("Request Rejected");
            }
          }
        }

      },
      (error) => {
        this.showError(error);
      });
      refresher.complete();
    }, 1000)
  }


  public cancel(){                                            //On click, send data to server which deletes the current request
      this.showLoading()

        let link = this.auth.mainUrl + 'request/delete/';
        let values = JSON.stringify({status: "delete"});

        setTimeout(() => {

        this.http.post(link, values).map(res => res.json()).subscribe(
          (data) => {

            this.loading.dismiss();

            if(data.pending_request == true){
                this.showError("Cancel Failed");              //If by any reason pending_request is true, alert that 
            }                                                 //the process has failed
            else if(data.has_clinician == true){
                this.navCtrl.setRoot(HomePage);               //If the user already has a clinician, send him to home page
            }
            else if(data.pending_request == false && data.has_clinician == false){
                this.navCtrl.setRoot(LoginPage);                                     //otherwise send back to login page
            }
          
          },
          (error) => {
            this.loading.dismiss();
            this.showError(error);
          });
        });
    }

    showLoading() {                               //Loading function using LoadingController
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    }

    showError(text) {                             //Alert error function using AlertController
      setTimeout(() => {
        this.loading.dismiss();
      });
  
      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present(prompt);
    }

}

