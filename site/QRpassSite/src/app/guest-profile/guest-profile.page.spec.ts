import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestProfilePage } from './guest-profile.page';

describe('GuestProfilePage', () => {
  let component: GuestProfilePage;
  let fixture: ComponentFixture<GuestProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
