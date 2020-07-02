import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertEditorComponent } from './cert-editor.component';

describe('CertEditorComponent', () => {
  let component: CertEditorComponent;
  let fixture: ComponentFixture<CertEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
