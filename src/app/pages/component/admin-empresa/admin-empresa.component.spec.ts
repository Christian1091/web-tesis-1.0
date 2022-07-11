import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpresaComponent } from './admin-empresa.component';

describe('AdminEmpresaComponent', () => {
  let component: AdminEmpresaComponent;
  let fixture: ComponentFixture<AdminEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
