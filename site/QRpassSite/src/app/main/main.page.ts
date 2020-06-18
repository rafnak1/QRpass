import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GuestService } from '../guest-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  guest: Guest = {
    name: "",
    birthDate: null,
    cpf: "",
    number: "",
    email: "",
    gender: "",
    password: "",
    foto: ""
  };

  notifications:Observable<any>;

  constructor(
    private guestService: GuestService,
    private navCtrl: NavController,
    public http: HttpClient
  ) { 

  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.guestService.getGuest("-1").subscribe(resp => {
      this.guest = resp;
      });
      
  }

  GoToProfilePage() {
    this.navCtrl.navigateBack('/GuestProfile');
  }

  GoTicketPage(){
    this.navCtrl.navigateBack('/ticket');
  }
}
