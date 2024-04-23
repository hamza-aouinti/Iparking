import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankTmpComponent } from './blank-tmp.component';

describe('BlankTmpComponent', () => {
  let component: BlankTmpComponent;
  let fixture: ComponentFixture<BlankTmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankTmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
