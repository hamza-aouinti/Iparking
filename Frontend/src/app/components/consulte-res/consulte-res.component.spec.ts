import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteResComponent } from './consulte-res.component';

describe('ConsulteResComponent', () => {
  let component: ConsulteResComponent;
  let fixture: ComponentFixture<ConsulteResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulteResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulteResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
