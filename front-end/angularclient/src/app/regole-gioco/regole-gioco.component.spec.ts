/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegoleGiocoComponent } from './regole-gioco.component';

describe('RegoleGiocoComponent', () => {
  let component: RegoleGiocoComponent;
  let fixture: ComponentFixture<RegoleGiocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegoleGiocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegoleGiocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
