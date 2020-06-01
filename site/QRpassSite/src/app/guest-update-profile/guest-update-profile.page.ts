import { Component, OnInit } from '@angular/core';
import { Guest, GuestService } from '../guest-service.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

var imgFile;

@Component({
  selector: 'app-guest-update-profile',
  templateUrl: './guest-update-profile.page.html',
  styleUrls: ['./guest-update-profile.page.scss'],
})
export class GuestUpdateProfilePage implements OnInit {

  fotoUrl: string;

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

  constructor(
    private guestService: GuestService,
    private toastCtrl: ToastController, 
    private afs: AngularFirestore,
    private router: Router ,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.guestService.getGuest("-1").subscribe(resp => {
      this.guest = resp;
      this.fotoUrl = "https://firebasestorage.googleapis.com/v0/b/qrpass-9dcb0.appspot.com/o/Image"+resp.foto+"?alt=media";
      });
      
  }

  updateGuest() {
    alert(imgFile + " e ");
    if(imgFile != undefined){
      this.guest.foto =  '%2F' + 'ProfilePic' + this.guest.cpf;
      alert("imagem nova!");
      var reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        const fileraw = imgFile;
        console.log(fileraw)
        const filePath = '/Image/' + 'ProfilePic' + this.guest.cpf;
        this.SaveImageRef(filePath, fileraw);
      }, error => {
        alert("Ocorreu um problema ao atualizar os dados :(. Tente novamente mais tarde");
      }
    } else {
      alert("Nao tem imagem nova");
    }
    alert(this.guest.foto);
    this.guestService.updateGuest(this.guest).then(() => {
      this.showToast('Dados atualizados');
    }, err => {
      this.showToast('Ocorreu um problema ao atualizar os dados :(. Tente novamente mais tarde');
    });
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

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
