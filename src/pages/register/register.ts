import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  data: any;
  createSuccess: boolean;
  registerCredentials = {             //Object in which credentials are stored
    fname: '', 
    lname: '',
    NHS: '',
    DateOfBirth: '',
    email: '',
    password: ''
}

  constructor(private navCtrl: NavController, private auth: Auth, 
              private alertCtrl: AlertController, private http: Http ) {}
  
  public register(){
    this.auth.register(this.registerCredentials).subscribe(success =>{

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let link = this.auth.mainUrl +  'create-account/';

      let values = JSON.stringify({
        first_name: this.registerCredentials.fname,
        last_name: this.registerCredentials.lname,
        NHS_no: this.registerCredentials.NHS,
        DoB: this.registerCredentials.DateOfBirth,
        email: this.registerCredentials.email,
        password: this.registerCredentials.password,
      })

      this.http.post(link, values).map(res => res.json()).subscribe( 
            
      (data) => {
          this.createSuccess = data.createSuccess;                    //store boolean value in a variable

          if(data.createSuccess){
            this.showPopup("Success", "Account Created.")             //if true, alert success
          } else {
            this.showPopup("Error", "Problem creating account.")      //otherwise, alert error
          }
      },
      err => {
        this.showPopup("Error: ", err)
      })
    
      },
      error => {
        this.showPopup("Error:  ", error)
      })
  }


  showPopup(title, text){                       //Alert popup function using AlertController
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: data => {
          if(this.createSuccess){
            this.navCtrl.setRoot(LoginPage);
          }
        }
      }]
    })
    alert.present();
  }

}
