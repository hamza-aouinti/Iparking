import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapParkComponent } from './map-park.component';

describe('MapComponent', () => {
  let component: MapParkComponent;
  let fixture: ComponentFixture<MapParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapParkComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
