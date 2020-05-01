/*declare const firebase: typeof import('firebase');
import * as functions from 'firebase-functions';
import { firebaseConfig } from 'firebase-functions';

 // Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

 export const AddGuest = functions.https.onRequest((request, response) => {

  function AddGuest(ID_Convid:number, Nome_Convid:string, Data_Nasc_Convid:string, CPF_Convid:string, Telefone_Convid:string,
     Email_Convid:string, ID_Sexo:number, Senha_Convid:string, Foto_Convid:string) {
    firebase.database().ref('Convidado/' + ID_Convid).set({
      ID_Convid:ID_Convid,
      Nome_Convid:Nome_Convid,
      Data_Nasc_Convid:Data_Nasc_Convid,
      CPF_Convid:CPF_Convid,
      Telefone_Convid:Telefone_Convid,
      Email_Convid:Email_Convid,
      ID_Sexo:ID_Sexo,
      Senha_Convid:Senha_Convid,
      Foto_Convid:Foto_Convid
    });
  }

  AddGuest(2, "Milena Alves","null","123.456.789-11","(11)91234-1234","Mi@email.com",2,"Senha","null");
  console.log('Adicionando Novo Convidado')
/*
public static class Guest {

  public int ID_Convid;
  public String Nome_Convid;
  public Date Data_Nasc_Convid;
  public String CPF_Convid;
  public String Telefone_Convid;
  public String Email_Convid;
  public int ID_Sexo;
  public String Senha_Convid;
  public String Foto_Convid;

  public Post(int ID_Convid, String Nome_Convid, Date Data_Nasc_Convid, String CPF_Convid, String Telefone_Convid, String Email_Convid,
  int ID_Sexo, String Senha_Convid, String Foto_Convid) {
    // ...
  }

}
/*void AddGuest(int ID_Convid, String Nome_Convid, Date Data_Nasc_Convid, String CPF_Convid, String Telefone_Convid, String Email_Convid,
  int ID_Sexo, String Senha_Convid, String Foto_Convid){


    DatabaseReference guestsRef = ref.child("Convidado");

    guestsRef.push().setValueAsync(new Guest(2, "Milena Alves",null,"123.456.789-11","(11)91234-1234","Mi@email.com",2,"Senha",null));
}

});*/