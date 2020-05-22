import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuestRegisterPage } from './guest-register/guest-register.page';
 
var LoggedGuest : Guest= {
  name: "",
  birthDate: null,
  cpf: "",
  number: "",
  email: "",
  gender: "",
  password: "",
  foto: ""
};


export interface Guest {
  id?: string,
  name: string,
  birthDate: Date,
  cpf: string,
  number: string,
  email: string,
  gender: string,
  password: string,
  foto: string
}



@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guests: Observable<Guest[]>;
  private guestCollection: AngularFirestoreCollection<Guest>;
 
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.guestCollection = this.afs.collection<Guest>('guests');
    this.guests = this.guestCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getGuests(): Observable<Guest[]> {
    return this.guests;
  }

  registerGuest(value) {
    var resp = new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
    LoggedGuest.email = value.email;
    LoggedGuest.password = value.password;
    return (resp);
  }

  getGuestID(){
    var resp = new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(LoggedGuest.email, LoggedGuest.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
    this.afAuth.authState.subscribe( user => {
      if (user) { LoggedGuest.id = user.uid }
    });    
    return 0;
  }

  signup(value) {
    return new Promise<any>((resolve, reject) => {
 
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  loginGuest(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
 
  logoutGuest() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }
 
  guestDetails() {
    return this.afAuth.user
  }

  guestLogin(guest: Guest): Observable<Guest> {
    return this.guestCollection.doc<Guest>(guest.email).valueChanges().pipe(
      take(1),
      map(guest => {
        guest.email = guest.email;
        return guest
      })
    );
  }
 
  getGuest(id: string): Observable<Guest> {
    return this.guestCollection.doc<Guest>(id).valueChanges().pipe(
      take(1),
      map(guest => {
        guest.id = id;
        return guest
      })
    );
  }
 
  addGuest(guest: Guest): Promise<DocumentReference> {
    guest.id = LoggedGuest.id;
    guest.email = LoggedGuest.email;
    guest.password = LoggedGuest.password;
    /*return this.afs.collection<Guest>('guests/').add(guest);*/
    
    return new Promise((resolve, reject) => {
      this.afs.collection<Guest>('guests/').doc(guest.id).set(guest)
          .then(() => {
            console.log("Cadastrado com sucesso");
            resolve();
          }).catch((error) => {
            console.log(error);
            reject();
          });
    })
    
  }
 
  updateGuest(guest: Guest): Promise<void> {
    return this.guestCollection.doc(guest.id).update({ name: guest.name, birthDate: guest.birthDate, cpf: guest.cpf, number: guest.number,
      email: guest.email, gender: guest.gender, password: guest.password, foto: guest.foto });
  }
 
  deleteGuest(id: string): Promise<void> {
    return this.guestCollection.doc(id).delete();
  }

  TesteRafa(i){
      return (i+1);
  }
}
