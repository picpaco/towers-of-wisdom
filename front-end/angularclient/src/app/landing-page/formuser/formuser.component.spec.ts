/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormuserComponent } from './formuser.component';

describe('FormuserComponent', () => {
  let component: FormuserComponent;
  let fixture: ComponentFixture<FormuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
