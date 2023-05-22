import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarClienteComponent } from './registar-cliente.component';

describe('RegistarClienteComponent', () => {
  let component: RegistarClienteComponent;
  let fixture: ComponentFixture<RegistarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
