import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNoticiaComponent } from './ver-noticia.component';

describe('VerNoticiaComponent', () => {
  let component: VerNoticiaComponent;
  let fixture: ComponentFixture<VerNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
