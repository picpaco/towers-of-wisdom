import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormgiocatoreComponent } from './formgiocatore.component';

describe('FormgiocatoreComponent', () => {
  let component: FormgiocatoreComponent;
  let fixture: ComponentFixture<FormgiocatoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormgiocatoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormgiocatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
