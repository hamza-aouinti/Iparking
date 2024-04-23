import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReservationsComponent } from './listReservations.component';

describe('ChatComponent', () => {
  let component:  ListReservationsComponent;
  let fixture: ComponentFixture< ListReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ListReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( ListReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
