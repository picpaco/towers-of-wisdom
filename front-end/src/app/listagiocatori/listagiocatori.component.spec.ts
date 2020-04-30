import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagiocatoriComponent } from './listagiocatori.component';

describe('ListagiocatoriComponent', () => {
  let component: ListagiocatoriComponent;
  let fixture: ComponentFixture<ListagiocatoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagiocatoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagiocatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
