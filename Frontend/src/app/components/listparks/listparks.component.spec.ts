import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListparksComponent } from './listparks.component';


describe('FormsComponent', () => {
  let component: ListparksComponent;
  let fixture: ComponentFixture<ListparksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListparksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListparksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
