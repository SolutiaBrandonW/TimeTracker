import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeComponent } from './view-time.component';

describe('ViewTimeComponent', () => {
  let component: ViewTimeComponent;
  let fixture: ComponentFixture<ViewTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
