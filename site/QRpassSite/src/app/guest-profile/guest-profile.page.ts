import { Component, OnInit } from '@angular/core';
import { GuestRegisterPage } from '../guest-register/guest-register.page';
import { Guest, GuestService } from '../guest-service.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.page.html',
  styleUrls: ['./guest-profile.page.scss'],
})
export class GuestProfilePage implements OnInit {

  fotoUrl: string;

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

  public buildingList: any[] = [
    {
        id: 1,
        label: 'Campus Gym!',
        image: '/assets/img/gym.png',
        //.... //any other properties
    }
    //..... //rest of buildings
  ];

  constructor(
    private guestService: GuestService,
    private toastCtrl: ToastController, 
    private router: Router ,
    ) { 
      
    }

  ngOnInit() {
    this.CpfLabel = this.guest.cpf;
  }

  ionViewWillEnter() {
    this.guestService.getGuest("-1").subscribe(resp => {
      this.guest = resp;
      alert(resp.foto);
      this.guest.foto = "https://firebasestorage.googleapis.com/v0/b/qrpass-9dcb0.appspot.com/o/Image"+resp.foto+"?alt=media";
      alert(this.guest.foto);
      this.fotoUrl = this.guest.foto;
      });
      
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
