import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestUpdateProfilePage } from './guest-update-profile.page';

describe('GuestUpdateProfilePage', () => {
  let component: GuestUpdateProfilePage;
  let fixture: ComponentFixture<GuestUpdateProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestUpdateProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestUpdateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
