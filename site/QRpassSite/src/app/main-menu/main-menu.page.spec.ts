import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainMenuPage } from './main-menu.page';

describe('MainMenuPage', () => {
  let component: MainMenuPage;
  let fixture: ComponentFixture<MainMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
