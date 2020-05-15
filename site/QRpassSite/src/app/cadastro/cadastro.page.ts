import { Component, OnInit } from '@angular/core';
import { GuestService, Guest } from 'src/app/guest-service.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
 
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
   
    constructor(private activatedRoute: ActivatedRoute, private guestService: GuestService,
      private toastCtrl: ToastController, private router: Router) { }
   
    ngOnInit() { }
   
    ionViewWillEnter() {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.guestService.getGuest(id).subscribe(guest => {
          this.guest = guest;
        });
      }
    }

    getGuestById() {
      let id;
       this.guestService.getGuest(id).subscribe(guest => {
          this.guest = guest;
        });
    }
   
    addGuest() {
      this.guestService.addGuest(this.guest).then(() => {
        this.router.navigateByUrl('/');
        this.showToast('Convidado adicionado');
      }, err => {
        this.showToast('Ocorreu um problema ao cadastrar o convidado :(. Tente novamente mais tarde');
      });
    }
   
    deleteGuest() {
      this.guestService.deleteGuest(this.guest.id).then(() => {
        this.router.navigateByUrl('/');
        this.showToast('Convidado deletado');
      }, err => {
        this.showToast('Ocorreu um problema ao deletar o convidado :(. Tente novamente mais tarde');
      });
    }
   
    updateGuest() {
      this.guestService.updateGuest(this.guest).then(() => {
        this.showToast('Dados atualizados');
      }, err => {
        this.showToast('Ocorreu um problema ao atualizar os dados :(. Tente novamente mais tarde');
      });
    }
   
    showToast(msg) {
      this.toastCtrl.create({
        message: msg,
        duration: 2000
      }).then(toast => toast.present());
    }
  }