import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestRegister2Page } from './guest-register2.page';

describe('GuestRegister2Page', () => {
  let component: GuestRegister2Page;
  let fixture: ComponentFixture<GuestRegister2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRegister2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestRegister2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
