import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteursComponent } from './capteurs.component';

describe('PlacesComponent', () => {
  let component: CapteursComponent;
  let fixture: ComponentFixture<CapteursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapteursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
