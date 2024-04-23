import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPaymentComponent } from './cardPayment.component';


describe('FormsComponent', () => {
  let component: CardPaymentComponent;
  let fixture: ComponentFixture<CardPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
