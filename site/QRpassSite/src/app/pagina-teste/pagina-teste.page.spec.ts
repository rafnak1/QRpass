import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaTestePage } from './pagina-teste.page';

describe('PaginaTestePage', () => {
  let component: PaginaTestePage;
  let fixture: ComponentFixture<PaginaTestePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaTestePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaTestePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
