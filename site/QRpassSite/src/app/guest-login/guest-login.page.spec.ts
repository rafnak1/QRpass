import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestLoginPage } from './guest-login.page';

describe('GuestLoginPage', () => {
  let component: GuestLoginPage;
  let fixture: ComponentFixture<GuestLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
