import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GuestService, Guest } from 'src/app/guest-service.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-guest-register',
  templateUrl: './guest-register.page.html',
  
  styleUrls: ['./guest-register.page.scss'],
})
export class GuestRegisterPage implements OnInit {
 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
  constructor(
    private navCtrl: NavController,
    private authService: GuestService,
    private formBuilder: FormBuilder
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
  }
 
  tryRegister(value) {
    this.authService.registerGuest(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
 
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
 
 
}
