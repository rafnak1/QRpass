import { Component, OnInit } from '@angular/core';
import { GuestServiceService } from './../guest-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  icecreams: any;
  icecreamName: string;
  icecreamCalories: number;
  icecreamDescription: string;

  constructor(private icecreamService: GuestServiceService) { }

  ngOnInit(){

      
      this.icecreamService.read_Icecreams().subscribe(data => {
      this.icecreams = data.map(e => {
      return{
        id: e.payload.doc.id,
        isEdit: false,
        Name: e.payload.doc.data()['Name'],
        Calories: e.payload.doc.data()['Calories'],
        Description: e.payload.doc.data()['Description'],
      };
      })
      console.log(this.icecreams);
      });
    }
    CreateRecord(){
      alert("${Teste}");
      let record = {};
      record['Name'] = this.icecreamName;
      record['Calories'] = this.icecreamCalories;
      record['Description'] = this.icecreamDescription;
      this.icecreamService.create_NewIcecream(record).then(resp => {
        this.icecreamName="";
        this.icecreamCalories= undefined;
        this.icecreamDescription = "";
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
    }
    RemoveRecord(rowID) {
        this.icecreamService.delete_Icecream(rowID);
    }
    EditRecord(record){
      record.isEdit = true;
      record.EditName = record.Name;
      record.EditCalories = record.Calories;
      record.EditDescription = record.Description;
    }
    UpdateRecord(recordRow){
      let record = {};
      record['Name']=recordRow.EditName;
      record['Calories']= recordRow.EditCalories;
      record['Description']= recordRow.EditDescription;
      this.icecreamService.update_Icecream(recordRow.id, record);
      recordRow.isEdit = false;
    }
  }
