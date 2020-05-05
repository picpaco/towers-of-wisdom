/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandscapeComponent } from './landscape.component';

describe('LandscapeComponent', () => {
  let component: LandscapeComponent;
  let fixture: ComponentFixture<LandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
