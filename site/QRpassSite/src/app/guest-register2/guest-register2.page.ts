import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GuestService, Guest } from 'src/app/guest-service.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-guest-register2',
  templateUrl: './guest-register2.page.html',
  styleUrls: ['./guest-register2.page.scss'],
})
export class GuestRegister2Page implements OnInit {

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

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Insira um email válido.' }
    ],
    'password': [
      { type: 'required', message: 'A senha é obrigatória.' },
      { type: 'minlength', message: 'A senha deve ter no mínimo 5 caracteres.' }
    ]
  };
  
  constructor(
    private navCtrl: NavController,
    private authService: GuestService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private guestService: GuestService,
    private toastCtrl: ToastController, 
    private router: Router
  ) { }
  
  ngOnInit() {
    this.authService.getGuestID();
  }
  
  tryRegister(value) {

          this.guest.name = value.name;
          this.guest.email = value.email;
          this.addGuest();
  }
  
  addGuest() {
    this.guestService.addGuest(this.guest).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Convidado adicionado com sucesso!');
    }, err => {
      this.showToast('Ocorreu um problema ao cadastrar o convidado :(. Tente novamente mais tarde');
    });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
  
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
