import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoPersonasComponent } from './admin-tipo-personas.component';

describe('AdminTipoPersonasComponent', () => {
  let component: AdminTipoPersonasComponent;
  let fixture: ComponentFixture<AdminTipoPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTipoPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTipoPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
