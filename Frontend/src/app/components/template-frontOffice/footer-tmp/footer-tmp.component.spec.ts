import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTmpComponent } from './footer-tmp.component';

describe('FooterTmpComponent', () => {
  let component: FooterTmpComponent;
  let fixture: ComponentFixture<FooterTmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterTmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
