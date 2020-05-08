import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestRegisterPage } from './guest-register.page';

describe('GuestRegisterPage', () => {
  let component: GuestRegisterPage;
  let fixture: ComponentFixture<GuestRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
