/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder } from '@angular/forms';
import { DataService } from '../landing-page/data.service';

const loginServiceSpy = jasmine.createSpyObj('AuthenticationService', ['navigateByUrl']);
const routerSpy = jasmine.createSpyObj('Router', ['login']);
const dataSpy = jasmine.createSpyObj('DataService', ['login']);

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    component = new LoginPageComponent(dataSpy, loginServiceSpy, routerSpy);
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports:[HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Il primo bottone dovrebbe essere il bottone Accedi', () => {
    const linkDes = fixture.debugElement
    .queryAll(By.css('Button'));
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe(' Accedi ');
  });
  it('La componente dovrebbe essere stata creata correttamente', () => {
    expect(component).toBeTruthy();
  });

  it('lo stato iniziale della componente dovrebbe essere consistente', () => {
    expect(component.invalidLogin).toBeFalsy();
    expect(component.checkLogin).toBeDefined();
    expect(component.updateData).toBeDefined();
    expect(component.aggiornaStringa).toBeDefined();
    expect(component.error).toBeFalsy();

  });

  /*it('submitted should be true when onSubmit()', () => {
    component.onSubmit(blankUser);
    expect(component.submitted).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));
});*/

});
