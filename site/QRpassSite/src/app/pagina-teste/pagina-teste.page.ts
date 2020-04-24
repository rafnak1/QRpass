import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-teste',
  templateUrl: './pagina-teste.page.html',
  styleUrls: ['./pagina-teste.page.scss'],
})
export class PaginaTestePage implements OnInit {

  constructor() { }

  ngOnInit() {
      alert("A pagina esta carregando :)");
  }

}
