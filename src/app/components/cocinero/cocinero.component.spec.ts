import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocineroComponent } from './cocinero.component';

describe('CocineroComponent', () => {
  let component: CocineroComponent;
  let fixture: ComponentFixture<CocineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



