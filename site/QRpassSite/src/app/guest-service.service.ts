import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GuestServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

/* create_NewIcecream : Cria um novo registro na coleção especificada usando o método add */
create_NewIcecream(record){
  return this.firestore.collection('Icecreams').add(record);
}
/*read_Icecream: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
read_Icecreams(){
  return this.firestore.collection('Icecreams').snapshotChanges();
}
/*update_Icecream : atualiza o registro pegando o ID e chamando o método de atualização */
update_Icecream(recordID,record) {
  this.firestore.doc('Icecreams/' + recordID).update(record);
}
/*delete_Icecream : chama o método de exclusão  ao registrar o ID*/
delete_Icecream(record_id) {
  this.firestore.doc('Icecreams/' + record_id).delete();
  }
}
