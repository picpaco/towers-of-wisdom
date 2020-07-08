/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatchPageComponent } from './match-page.component';

describe('MatchPageComponent', () => {
  let component: MatchPageComponent;
  let fixture: ComponentFixture<MatchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('le torri dovrebbero essere tutte undefined quandi si carica la pagina!', () => {
  //   expect(component.torriGiocatore[0]).toBeUndefined;
  //   expect(component.torriGiocatore[1]).toBeUndefined;
  //   expect(component.torriGiocatore[2]).toBeUndefined;
  //   expect(component.torriGiocatore[3]).toBeUndefined;
  // });

  
});
