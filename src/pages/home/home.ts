import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import {Latest} from '../latestTestResults/latest';
import {Upcoming} from '../upcomingTest/upcoming';
import { Http, Headers } from '@angular/http';
import { viewTest } from '../viewTest/viewTest';
import { DomainPage } from '../domainPage/domainPage';

declare var wheelnav: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  username = '';
  email= '';
  items: any;
  allItems: any;
  testResult: any;
  allColors = ["#e5e5e5"];
  wheeln: any;
  loading: any;

  cholesterol: any = {id: -1, color: "#e5e5e5"};
  lipids: any = {id: -1, color: "#e5e5e5"};
  prolactin: any = {id: -1, color: "#e5e5e5"};
  renal: any = {id: -1, color: "#e5e5e5"};
  blood: any = {id: -1, color: "#e5e5e5"};
  ecg:any = {id: -1, color: "#e5e5e5"};
  bmi: any = {id: -1, color: "#e5e5e5"};
  sugar: any = {id: -1, color: "#e5e5e5"};
  hba1c: any = {id: -1, color: "#e5e5e5"};
  liver: any = {id: -1, color: "#e5e5e5"};

  currentDate: Date = new Date();

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, private auth: Auth, private http: Http) {
    // let info = this.auth.getUserInfo();
    // this.username = info.name;

    let link = this.auth.mainUrl + 'tests/upcoming/';
    //let values = JSON.stringify({last_updated: '2017-03-01', verbose: true})

    this.http.get(link).map(res => res.json()).subscribe(
      (data) => {
        this.items = data;
        this.items = this.items.slice(0, 2);


        for(let i = 0; i < data.length; i++){

            let testDate = new Date(String(data[i].date));

            let timeDif = Math.abs(this.currentDate.getTime() - testDate.getTime());
            let difDays = Math.ceil(timeDif/(1000 * 3600 * 24));

            // this.showError(difDays);

            let colors;

            if(difDays < 7){
              colors = "#6094a8";
            }
            else if(difDays < 30){
              colors = "#79b9d3";
            }
            else if(difDays < 60){
              colors = "#a1cee0";
            }
            else if(difDays < 365){
              colors = "#c6e1ec";
            }
            else if(difDays < 2*365){
              colors = "#e2f0f5";
            }
            else{
              colors = "#e5e5e5";
            }

            if(data[i].name == "CHOLESTEROL"){
              this.cholesterol = {id: data[i].id, color: colors};
            }
            if(data[i].name == "LIPIDS"){
              this.lipids = {id: data[i].id, color: colors};
            }
            if(data[i].name == "PROLACTIN"){
              this.prolactin = {id: data[i].id, color: colors};
            }
            if(data[i].name == "RENAL"){
              this.renal = {id: data[i].id, color: colors};
            }
            if(data[i].name == "BLOOD"){
              this.blood = {id: data[i].id, color: colors};
            }
            if(data[i].name == "ECG"){
              this.ecg = {id: data[i].id, color: colors};
            }
            if(data[i].name == "BMI"){
              this.bmi = {id: data[i].id, color: colors};
            }
            if(data[i].name == "FBSUGAR"){
              this.sugar = {id: data[i].id, color: colors};
            }
            if(data[i].name == "HBA1C"){
              this.hba1c = {id: data[i].id, color: colors};
            }
            if(data[i].name == "LIVER"){
              this.liver = {id: data[i].id, color: colors};
            }
        }

        this.allColors = [this.cholesterol.color, this.lipids.color, this.prolactin.color, this.renal.color,
                        this.blood.color, this.ecg.color, this.bmi.color, this.sugar.color, this.hba1c.color, this.liver.color];

        if(this.wheeln != undefined){

          this.wheeln.removeWheel();
          this.wheeln.colors = this.allColors;
          this.wheeln = new wheelnav("divWheelnav");
          this.wheeln.maxPercent = 1.08;
          this.wheeln.slicePathAttr = { stroke: 'white', 'stroke-width': 2 };
          this.wheeln.colors = this.allColors;
          this.wheeln.createWheel(["Cholest.", "Lipids", "Prolactin", "Renal F", "Blood Pr.","ECG", "BMI", "Blood Sug.",
          "Hba1c", "Liver F"]);

    this.wheeln.navItems[0].navItem.click(() => { this.sendToViewTest(this.cholesterol.id) })
    this.wheeln.navItems[1].navItem.click(() => { this.sendToViewTest(this.lipids.id) })
    this.wheeln.navItems[2].navItem.click(() => { this.sendToViewTest(this.prolactin.id) })
    this.wheeln.navItems[3].navItem.click(() => { this.sendToViewTest(this.renal.id) })
    this.wheeln.navItems[4].navItem.click(() => { this.sendToViewTest(this.blood.id) })
    this.wheeln.navItems[5].navItem.click(() => { this.sendToViewTest(this.ecg.id) })
    this.wheeln.navItems[6].navItem.click(() => { this.sendToViewTest(this.bmi.id) })
    this.wheeln.navItems[7].navItem.click(() => { this.sendToViewTest(this.sugar.id) })
    this.wheeln.navItems[8].navItem.click(() => { this.sendToViewTest(this.hba1c.id) })
    this.wheeln.navItems[9].navItem.click(() => { this.sendToViewTest(this.liver.id) })

        }

      },
      err => {
        this.showError(err);
      })


  }

  ionViewDidEnter(){

    this.wheeln = new wheelnav("divWheelnav");
    this.wheeln.maxPercent = 1.08;
    this.wheeln.slicePathAttr = { stroke: 'white', 'stroke-width': 2 };
    this.wheeln.colors = this.allColors;
    this.wheeln.createWheel(["Cholest.", "Lipids", "Prolactin", "Renal F", "Blood Pr.","ECG", "BMI", "Blood Sug.",
     "Hba1c", "Liver F"]);

    this.wheeln.navItems[0].navItem.click(() => { this.sendToViewTest(this.cholesterol.id) })
    this.wheeln.navItems[1].navItem.click(() => { this.sendToViewTest(this.lipids.id) })
    this.wheeln.navItems[2].navItem.click(() => { this.sendToViewTest(this.prolactin.id) })
    this.wheeln.navItems[3].navItem.click(() => { this.sendToViewTest(this.renal.id) })
    this.wheeln.navItems[4].navItem.click(() => { this.sendToViewTest(this.blood.id) })
    this.wheeln.navItems[5].navItem.click(() => { this.sendToViewTest(this.ecg.id) })
    this.wheeln.navItems[6].navItem.click(() => { this.sendToViewTest(this.bmi.id) })
    this.wheeln.navItems[7].navItem.click(() => { this.sendToViewTest(this.sugar.id) })
    this.wheeln.navItems[8].navItem.click(() => { this.sendToViewTest(this.hba1c.id) })
    this.wheeln.navItems[9].navItem.click(() => { this.sendToViewTest(this.liver.id) })
    // console.log(Object.getOwnPropertyNames(wheeln));

  }

  sendToViewTest(id){
    
    if(id == -1){
      return;
    }

    this.showLoading();

    setTimeout(() => {


      let link = this.auth.mainUrl + 'tests/get/';
      let values = JSON.stringify({id: id})    

      this.http.post(link, values).map(res => res.json()).subscribe(
        (data) => {

          this.testResult = data;
          this.loading.dismiss();
          this.navCtrl.push(viewTest, {result: this.testResult});
            
        },
        err => {
            this.loading.dismiss();
            this.showError(err);
        })

     })
  }

  public logout(){
    this.auth.logout()
    .subscribe(succ => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

  sendViewLatest(){

    this.navCtrl.push(DomainPage)
  }
  sendViewUpcomming(){

    this.navCtrl.push(Upcoming)
  }

  showLoading() {                                 //Loading message using LoadingController
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
