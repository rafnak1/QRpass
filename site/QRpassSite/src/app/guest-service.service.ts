import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Guest {
  id?: string,
  name: string,
  birthDate: Date,
  cpf: string,
  number: string,
  email: string,
  id_sex: Int16Array,
  sex: string,
  password: string,
  foto: string
}
 
@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guests: Observable<Guest[]>;
  private guestCollection: AngularFirestoreCollection<Guest>;
 
  constructor(private afs: AngularFirestore) {
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
    return this.guestCollection.add(guest);
  }
 
  updateGuest(guest: Guest): Promise<void> {
    return this.guestCollection.doc(guest.id).update({ name: guest.name, birthDate: guest.birthDate, cpf: guest.cpf, number: guest.number,
      email: guest.email, id_sex: guest.id_sex, password: guest.password, foto: guest.foto });
  }
 
  deleteGuest(id: string): Promise<void> {
    return this.guestCollection.doc(id).delete();
  }
}
