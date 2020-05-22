import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GuestService, Guest } from 'src/app/guest-service.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-guest-register',
  templateUrl: './guest-register.page.html',
  styleUrls: ['./guest-register.page.scss'],
})
export class GuestRegisterPage implements OnInit {
 
 
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
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
    /*this.authService.getGuestID();*/
  }
 
  tryRegister(value) {
    this.authService.registerGuest(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        this.navCtrl.navigateBack('/signup2');
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
      /* fazendo o login do usuario que acabou de cadastrar*/
      /*this.authService.loginGuest(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.errorMessage = err.message;
      });*/
      /*this.goSecondPage();*/
  }
  
  goLoginPage() {
    this.navCtrl.navigateBack('/login');
  }

  goSecondPage() {
    alert("Fui chamado!");
    this.navCtrl.navigateBack('/signup2');
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
