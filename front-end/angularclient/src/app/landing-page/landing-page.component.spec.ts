/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('dovrebbe creare il componente', () => {
     expect(component).toBeTruthy();
   });

   it('il titolo dovrebbe essere Towers of wisdom', () => {
    expect(component.title).toEqual("Towers of wisdom");
  });


  it('il bottone dovrebbe esistere', () => { 
    expect(component.bottoneLanding).toEqual(true);
    
  });
  
  it('il tag h2 deve contenere l"attributo intro', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.col-md-12 h2').textContent).toContain(
      component.intro
    );
   
  });

   it('il tag p titolo deve contenere l"attributo titolo', () => {
     fixture.detectChanges();
     let compiled = fixture.debugElement.nativeElement;
     expect(compiled.querySelector('div p.font_title').textContent).toContain(
       component.title
     );
   
   });

it('Il primo bottone dovrebbe essere il bottone Entra', () => {
  const linkDes = fixture.debugElement
  .queryAll(By.css('Button'));
  const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
  expect(nativeButton.textContent).toBe('Entra');
});

it('Il secondo bottone dovrebbe essere il bottone Regole del gioco', () => {
  const linkDes = fixture.debugElement
  .queryAll(By.css('Button'));
  const nativeButton: HTMLButtonElement = linkDes[1].nativeElement;
  expect(nativeButton.textContent).toBe('Regoledel gioco');
});

it('Il terzo bottone dovrebbe essere il bottone Demo', () => {
  const linkDes = fixture.debugElement
  .queryAll(By.css('Button'));
  const nativeButton: HTMLButtonElement = linkDes[2].nativeElement;
  expect(nativeButton.textContent).toBe('Demo');
});

});
