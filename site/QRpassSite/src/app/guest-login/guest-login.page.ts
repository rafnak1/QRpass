import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GuestService, Guest } from 'src/app/guest-service.service';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.page.html',
  styleUrls: ['./guest-login.page.scss'],
})
export class GuestLoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  
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
  
  
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  
  
  loginUser(value) {
    this.authService.loginGuest(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.authService.getGuestID();
        this.navCtrl.navigateForward('/main');
      }, err => {
        this.errorMessage = err.message;
      });
      
  }

  getUserId(){
    return(this.authService.getGuestID());
  }
  
  goToRegisterPage() {
    this.navCtrl.navigateForward('/signup');
  }
  
}
