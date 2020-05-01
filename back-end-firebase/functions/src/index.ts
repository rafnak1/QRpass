import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
 // Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

 export const helloWorld = functions.https.onRequest((request, response) => {
    console.log('Aqui tu pode escrever mensagens pro log visto apenas no firebase! Mas n ta funcionando... Funcionou, lembre de sempre salvar antes de dar deploy :)')
  response.send("Hello from me!");
  //GetGuest;
 });

 export const AddGuest = functions.https.onRequest((request, response) => {

});

 export const GetGuest = functions.https.onRequest((request, response) => {
  var Id_User;
  const promise = admin.firestore().doc('Convidado/'+Id_User).get()
  const p2 = promise.then(snapshot => {
      const data = snapshot.data()
      response.send(data)
  })
  p2.catch(error => {
      //handle the error
      console.log(error)
      response.status(500).send(error)
  })

});

