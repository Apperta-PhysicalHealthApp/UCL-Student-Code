import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Request } from '../createRequest/request';
import { Pending } from '../pending/pending';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})
export class LoginPage {

  loading: Loading;
  registerCredentials = {username: '', password: ''}      //Store credentials
  responose: string;
  data: string;

  constructor(private navCtrl: NavController, private auth: Auth, 
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              private http: Http) 
              {
                
              }

  public createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  public forgottenPass(){
    window.open('http://metabolicapp.azurewebsites.net/password/reset/', '_system');
  }


  public login() {

    this.showLoading()

    let link = this.auth.mainUrl + 'login/';
    let values = JSON.stringify({username: this.registerCredentials.username,
                              password: this.registerCredentials.password});


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    setTimeout(() => {

    this.http.post(link, values, {headers: headers}).map(res => res.json()).subscribe(      //Send user name and password
        
      (data) => {                         //receive token from database with values "pending_request" and "has_clinician"

          this.data = data;
          this.loading.dismiss();

          if(data.has_clinician == true){               //if the user already has a clinician, redirect him to the home page
            this.navCtrl.setRoot(HomePage);
          }
          else if(data.pending_request == true){        //if the user has only a pending request, send him to the Pending page
            this.navCtrl.push(Pending)
          }
          else if(data.pending_request == false){       //if the user doesn't have a pending request, send him to the Request page
            this.navCtrl.push(Request);  
          }
      
      },
      (error) => {
        this.loading.dismiss();
        this.showError(error);
      });
    });
  }

  showLoading() {                                 //Loading message using LoadingController
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {                              //Error Alert function using AlertController

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
