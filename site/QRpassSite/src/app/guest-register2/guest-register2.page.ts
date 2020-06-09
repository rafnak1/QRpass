import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GuestService, Guest } from 'src/app/guest-service.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

var imgFile;

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-guest-register2',
  templateUrl: './guest-register2.page.html',
  styleUrls: ['./guest-register2.page.scss'],
})
export class GuestRegister2Page implements OnInit {
  
  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }
  

  loading: boolean = false;
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
    private router: Router ,
    private afs: AngularFirestore, 
    private storage: AngularFireStorage
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
    this.guest.foto =  '%2F' + 'ProfilePic' + this.guest.cpf;
    // For Uploading Image To Firebase
    var reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e:any) => { // called once readAsDataURL is completed
      const fileraw = imgFile;
      console.log(fileraw)
      const filePath = '/Image/' + 'ProfilePic' + this.guest.cpf;
      this.SaveImageRef(filePath, fileraw);
    }, error => {
      alert("Ocorreu um problema ao cadastrar o convidado :(. Tente novamente mais tarde");
    }
    this.guestService.addGuest(this.guest).then(() => {
      
      
      this.router.navigateByUrl('/main');
      this.showToast('Convidado adicionado com sucesso!');
    }, err => {
      console.log(err);
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
  
  uploadImage(event) {
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
     
      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
        imgFile = event.target.files[0];
      }, error => {
        alert("Error");
      }
      
    }
  }

  SaveImageRef(filePath, file) {
    return {
      
      // Create a root reference
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
      
    };
  }
  
}
