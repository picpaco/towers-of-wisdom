/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListautentiComponent } from './listautenti.component';

describe('ListautentiComponent', () => {
  let component: ListautentiComponent;
  let fixture: ComponentFixture<ListautentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListautentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListautentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
